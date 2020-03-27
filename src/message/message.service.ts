import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDTO } from './dtos';
import { MessageRepository } from './message.repository';
import { User } from 'src/user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {}

  saveMessage(dto: CreateMessageDTO, user: User) {
    return this.messageRepository.createMessage(dto, user);
  }
}
