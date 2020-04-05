import { Repository, EntityRepository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDTO } from './dtos';
import { User } from 'src/user/user.entity';
import { EditMessageDTO } from './dtos/edit-message.dto';
import { UnauthorizedException } from '@nestjs/common';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async createMessage(dto: CreateMessageDTO, user: User): Promise<Message> {
    const { text } = dto;
    const message = new Message();
    message.text = text;
    message.user = user;
    await message.save();
    return message;
  }

  async editMessage(id: number, dto: EditMessageDTO, user: User): Promise<Message> {
    const message = await this.findOne(id, { relations: ['user'] });
    
    if (!message || message.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    message.text = dto.text;
    return message.save();
  }
}
