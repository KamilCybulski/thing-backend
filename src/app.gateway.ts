import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDTO } from './message/message.dto';
import { MessageService } from './message/message.service';
import { UserDTO } from './user/dtos';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  private logger = new Logger('AppGateway');

  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
  ) {}

  afterInit() {
    this.logger.log('Initialized');
  }

  async handleConnection(client: Socket) {
    try {
      const { token } = client.handshake.query;
      const { id } = this.jwtService.verify<{ id: number }>(token)
      const user = await this.authService.validateJWT(id);
      client.request.user = user;
      this.logger.verbose(`${user.name} connected (id: ${user.id})`);
    } catch (error) {
      client.disconnect();
      this.logger.verbose(`Connection attempt failed: ${error.message}`);
    }
  }
  
  handleDisconnect(client: Socket) {
    this.logger.verbose(`Client with ID ${client.id} disconnected`);
  }
  
  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() dto: MessageDTO): Promise<void> {
    const message = await this.messageService.saveMessage(dto);
    this.server.emit('message', message);
  }
}
