import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDTO } from './message.dto';
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
