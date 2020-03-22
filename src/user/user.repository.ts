import { ConflictException } from '@nestjs/common';
import { CredentialsDTO } from 'src/auth/dtos';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SqlErrorCodes } from 'src/constants';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CredentialsDTO): Promise<void> {
    const user = new User();
      user.name = dto.username;
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(dto.password, user.salt)

    try {
      await user.save();
    } catch (error) {
      if (error.code === SqlErrorCodes.UniqueViolation) {
        throw new ConflictException();
      } else {
        throw error;
      }
    }
  }
}
