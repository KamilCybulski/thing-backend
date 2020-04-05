import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageService } from "./message.service";
import { MessageRepository } from "./message.repository";
import { MessageController } from './message.controller';
import { MessageSubscriber } from "./message.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [MessageService, MessageSubscriber],
  controllers: [MessageController],
  exports: [MessageService, MessageSubscriber],
})
export class MessageModule {}
