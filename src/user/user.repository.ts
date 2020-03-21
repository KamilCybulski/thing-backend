import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialsDTO } from './dtos';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: UserCredentialsDTO): Promise<User> {
    const { name, password } = dto;
    const user = new User();
    user.name = name;
    user.password = password;
    await user.save();
    return user;
  }

  findUser(dto: UserCredentialsDTO): Promise<User> {
    return this.findOne({ where: { name: dto.name } })
  }
}
