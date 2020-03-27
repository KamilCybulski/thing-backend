import { Repository, EntityRepository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDTO } from './dtos';
import { User } from 'src/user/user.entity';

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
}
