import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCredentialsDTO } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UserService {
  logger = new Logger('UserService');

  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

  create(dto: UserCredentialsDTO): Promise<User> {
    return this.userRepository.createUser(dto);
  }

  find(dto: UserCredentialsDTO): Promise<User> {
    return this.userRepository.findUser(dto);
  }

  async validate(dto: UserCredentialsDTO) {
    const user = await this.find(dto);
    if (user && user.password === dto.password) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
