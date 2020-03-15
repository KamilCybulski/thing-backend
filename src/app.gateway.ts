import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): WsResponse<string> {
    return { event: 'message', data };
  }
}

