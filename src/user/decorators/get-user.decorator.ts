import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from '../user.entity';

export type Protocol = 'ws' | 'http';

export const GetUser = createParamDecorator(
  (data: Protocol, ctx: ExecutionContext): User =>
    data === 'ws'
      ? ctx.switchToWs().getClient<Socket>().request.user
      : ctx.switchToHttp().getRequest().user,
);
