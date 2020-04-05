import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageService } from "./message.service";
import { MessageRepository } from "./message.repository";
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [MessageService],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
