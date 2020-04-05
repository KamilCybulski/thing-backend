import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDTO, MessageDTO } from './dtos';
import { MessageRepository } from './message.repository';
import { User } from 'src/user/user.entity';
import { EditMessageDTO } from './dtos/edit-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {}

  saveMessage(dto: CreateMessageDTO, user: User) {
    return this.messageRepository.createMessage(dto, user);
  }

  async editMessage(id: number, dto: EditMessageDTO, user: User): Promise<MessageDTO> {
    const message = await this.messageRepository.editMessage(id, dto, user);
    return message.toDTO();
  }
}
