import { EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private logger = new Logger('UserSubscriber');
  onAfterInsert: Function[] = [];

  constructor(@InjectConnection() private readonly connection: Connection) {
    connection.subscribers.push(this);
    this.logger.log('Initialized');
  }

  listenTo() {
    return User;
  }

  subscribeToAfterInsert(handler: Function) {
    this.onAfterInsert.push(handler);
  }

  afterInsert(event: InsertEvent<User>) {
    this.onAfterInsert.forEach((handler) => handler(event));
  }
}
