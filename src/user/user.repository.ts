import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialsDTO } from './dtos';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: UserCredentialsDTO): Promise<User> {
    const user = new User();
    user.name = dto.username;
    user.password = dto.password;
    await user.save();
    return user;
  }
}
