import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message/message.service';
import { MessageDTO } from './message/message.dto';

@WebSocketGateway()
export class AppGateway implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  private logger = new Logger('AppGateway');

  constructor(private readonly messageService: MessageService) {}

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.verbose(`Client with ID ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.verbose(`Client with ID ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() dto: MessageDTO): Promise<void> {
    const message = await this.messageService.saveMessage(dto);
    this.server.emit('message', message);
  }
}
