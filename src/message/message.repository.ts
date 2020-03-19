import { Repository, EntityRepository } from 'typeorm';
import { Message } from './message.entity';
import { MessageDTO } from './message.dto';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async createMessage(dto: MessageDTO): Promise<Message> {
    const { username, text } = dto;
    const message = new Message();
    message.username = username;
    message.text = text;
    await message.save();
    return message;
  }
}
