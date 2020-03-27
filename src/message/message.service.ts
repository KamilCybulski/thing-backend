import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDTO } from './dtos';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {}

  saveMessage(dto: MessageDTO) {
    return this.messageRepository.createMessage(dto);
  }
}
