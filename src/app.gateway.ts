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
import { CreateMessageDTO } from './message/dtos';
import { MessageService } from './message/message.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { GetUser } from './user/decorators/get-user.decorator';
import { User } from './user/user.entity';
import { UserSubscriber } from './user/user.subscriber';
import { InsertEvent } from 'typeorm';
import { UserService } from './user/user.service';
import { UserPresence } from './types';


@WebSocketGateway()
export class AppGateway implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  private server: Server;
  private logger = new Logger('AppGateway');
  private users: Record<string, UserPresence> = {};

  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly userSubscriber: UserSubscriber,
  ) {}

  async afterInit() {
    this.logger.log('Initialized');

    // Load all users that are saved in the db
    const allUsers = await this.userService.getAll();
    allUsers.forEach((user) => {
      this.users[String(user.id)] = { ...user.toDTO(), active: false };
    });

    // Update the users list after every new user registers
    this.userSubscriber.subscribeToAfterInsert((event: InsertEvent<User>) => {
      const user = event.entity;
      this.users[String(user.id)] = { ...user.toDTO(), active: false };
    });
  }

  async handleConnection(client: Socket) {
    try {
      // Authenticate user
      const { token } = client.handshake.query;
      const { id } = this.jwtService.verify<{ id: number }>(token);
      const user = await this.authService.validateJWT(id);
      client.request.user = user;

      // Update user status and inform clients
      this.users[String(user.id)].active = true;
      this.server.emit('presence', this.users);

      this.logger.verbose(`${user.name} connected (id: ${user.id})`);
    } catch (error) {
      client.disconnect();
      this.logger.verbose(`Connection attempt failed: ${error.message}`);
    }
  }

  handleDisconnect(client: Socket) {
    const user: User = client.request.user;
    if (user) {
      this.users[String(user.id)].active = false;
      this.server.emit('presence', this.users);
    }
    this.logger.verbose(`Client with ID ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  async handleMessage(@GetUser('ws') user: User, @MessageBody() dto: CreateMessageDTO): Promise<void> {
    const message = await this.messageService.saveMessage(dto, user);
    this.server.emit('message', message.toDTO());
  }
}
