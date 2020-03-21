import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCredentialsDTO } from './dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

  signUp(dto: UserCredentialsDTO) {
    return this.userRepository.createUser(dto);
  }

  signIn(dto: UserCredentialsDTO) {
    return this.userRepository.validateUser(dto);
  }
}
