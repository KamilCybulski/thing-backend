import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCredentialsDTO } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

  create(dto: UserCredentialsDTO): Promise<User> {
    return this.userRepository.createUser(dto);
  }

  findByName(name: string): Promise<User> {
    return this.userRepository.findOne({ where: { name } });
  }
}
