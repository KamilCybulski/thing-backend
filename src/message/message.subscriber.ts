import { EntitySubscriberInterface, Connection, UpdateEvent } from "typeorm";
import { Message } from "./message.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";

@Injectable()
export class MessageSubscriber implements EntitySubscriberInterface<Message> {
  private logger = new Logger('MessageSubscriber');
  private onAfterUpdate: Function[] = [];

  constructor(@InjectConnection() private readonly connection: Connection) {
    connection.subscribers.push(this);
    this.logger.log('Initialized');
  }

  listenTo() {
    return Message;
  }

  afterUpdate(event: UpdateEvent<Message>) {
    this.onAfterUpdate.forEach((handler) => handler(event.entity));
  }

  subscribeToAfterUpdate(handler: Function) {
    this.onAfterUpdate.push(handler);
  }
}
