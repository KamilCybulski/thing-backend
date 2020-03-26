import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDTO } from './message/message.dto';
import { MessageService } from './message/message.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { GetUser } from './user/decorators/get-user.decorator';
import { UserDTO } from './user/dtos';

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
      const { id } = this.jwtService.verify<{ id: number }>(token);
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
  async handleMessage(@GetUser('ws') user: UserDTO, @MessageBody() dto: MessageDTO): Promise<void> {
    // TODO actually use user object and it's relation to message
    const message = await this.messageService.saveMessage({ ...dto, username: user.name });
    this.server.emit('message', message);
  }
}
