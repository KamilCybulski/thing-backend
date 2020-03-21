import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCredentialsDTO } from './dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

  create(dto: UserCredentialsDTO) {
    return this.userRepository.createUser(dto);
  }

  find(dto: UserCredentialsDTO) {
    return this.userRepository.findUser(dto);
  }
}
