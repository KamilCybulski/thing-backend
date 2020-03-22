import { ConflictException } from '@nestjs/common';
import { CredentialsDTO } from 'src/auth/dtos';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SqlErrorCodes } from 'src/constants';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CredentialsDTO): Promise<User> {
    try {
      const user = new User();
      user.name = dto.username;
      user.password = dto.password;
      await user.save();
      return user;
    } catch (error) {
      if (error.code === SqlErrorCodes.UniqueViolation) {
        throw new ConflictException();
      } else {
        throw error;
      }
    }
  }
}
