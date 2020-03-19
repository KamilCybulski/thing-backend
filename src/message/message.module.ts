import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageService } from "./message.service";
import { MessageRepository } from "./message.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
