import { Repository, EntityRepository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserCredentialsDTO } from './dtos';
import { UserDTO } from './dtos';

const convertUserToDTO = (user: User): UserDTO => ({
  name: user.name,
  id: user.id,
  createdAt: user.createdAt,
});

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: UserCredentialsDTO): Promise<UserDTO> {
    const { name, password } = dto;
    const user = new User();
    user.name = name;
    user.password = password;
    await user.save();
    return convertUserToDTO(user);
  }

  async validateUser(dto: UserCredentialsDTO): Promise<UserDTO> {
    const { name, password } = dto;
    const user = await this.findOne({ where: { name } });
    if (user && password === user.password) {
      return convertUserToDTO(user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
