import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { UserCredentialsDTO, UserDTO } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  create(dto: UserCredentialsDTO): Promise<User> {
    return this.userRepository.createUser(dto);
  }

  findByName(name: string): Promise<User> {
    return this.userRepository.findOne({ where: { name } });
  }

  signIn(dto: UserDTO) {
    return {
      accessToken: this.jwtService.sign(dto),
    };
  }
}
