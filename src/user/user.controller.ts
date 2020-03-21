import { Controller, Post, HttpCode, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialsDTO, UserDTO } from './dtos';
import { User } from './user.entity';

const convertUserToDTO = (user: User): UserDTO => ({
  name: user.name,
  id: user.id,
  createdAt: user.createdAt,
});

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {};

  @Post('/signup')
  async signUp(@Body() body: UserCredentialsDTO) {
    const user = await this.userService.create(body);
    return convertUserToDTO(user);
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() body: UserCredentialsDTO) {
    const user = await this.userService.find(body);
    if (user) {
      return convertUserToDTO(user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
