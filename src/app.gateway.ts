import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message/message.service';
import { MessageDTO } from './message/message.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() dto: MessageDTO): Promise<void> {
    const message = await this.messageService.saveMessage(dto);
    this.server.emit('message', message);
  }
}
