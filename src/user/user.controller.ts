import { Controller, Post, HttpCode, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialsDTO, UserDTO } from './dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {};

  @Post('/signup')
  async signUp(@Body() body: UserCredentialsDTO): Promise<UserDTO> {
    const user = await this.userService.create(body);
    return user.toDTO();
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() body: UserCredentialsDTO): Promise<UserDTO> {
    const user = await this.userService.find(body);
    if (user) {
      return user.toDTO();
    } else {
      throw new UnauthorizedException();
    }
  }
}
