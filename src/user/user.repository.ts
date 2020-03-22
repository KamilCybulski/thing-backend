import { ConflictException } from '@nestjs/common';
import { CredentialsDTO } from 'src/auth/dtos';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CredentialsDTO): Promise<User> {
    const { username, password } = dto;

    const count = await this.count({ name: username });
    if (count > 0) {
      throw new ConflictException();
    }

    const user = new User();
    user.name = username;
    user.password = password;
    await user.save();
    return user;
  }
}
