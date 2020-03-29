import { ConflictException } from '@nestjs/common';
import { CredentialsDTO } from 'src/auth/dtos';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SqlErrorCodes } from 'src/constants';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDTO } from './dtos';

interface HashPasswordResult {
  hash: string;
  salt: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CredentialsDTO): Promise<void> {
    const user = new User();
      const { hash, salt } = await this.hashPassword(dto.password);
      user.name = dto.username;
      user.salt = salt
      user.password = hash;

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

  async changeUserPassword(dto: ChangePasswordDTO, user: User): Promise<void> {
    const { hash, salt } = await this.hashPassword(dto.password);
    user.password = hash;
    user.salt = salt;
    await user.save();
  }

  async hashPassword(password: string): Promise<HashPasswordResult> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
  }
}
