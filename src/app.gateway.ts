import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';

@WebSocketGateway()
class AppGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() msg: string): WsResponse<string> {
    return { event: 'message', data: msg };
  }
}

