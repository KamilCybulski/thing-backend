import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDTO } from '../dtos';
import { Socket } from 'socket.io';

export type Protocol = 'ws' | 'http';

export const GetUser = createParamDecorator(
  (data: Protocol, ctx: ExecutionContext): UserDTO =>
    data === 'ws'
      ? ctx.switchToWs().getClient<Socket>().request.user
      : ctx.switchToHttp().getRequest().user,
);
