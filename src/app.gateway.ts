import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { MessageService } from './message/message.service';
import { MessageDTO } from './message/message.dto';
import { Message } from './message/message.entity';

@WebSocketGateway()
export class AppGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() dto: MessageDTO): Promise<WsResponse<Message>> {
    const message = await this.messageService.saveMessage(dto)
    return { event: 'message', data: message };
  }
}

