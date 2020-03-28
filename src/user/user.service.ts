import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDTO } from 'src/auth/dtos';
import { User } from './user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  create(dto: CredentialsDTO): Promise<void> {
    return this.userRepository.createUser(dto);
  }

  findByName(name: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name } });
  }

  findById(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
