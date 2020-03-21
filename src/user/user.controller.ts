import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialsDTO } from './dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {};

  @Post('/signup')
  signUp(@Body() body: UserCredentialsDTO) {
    return this.userService.signUp(body);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body() body: UserCredentialsDTO) {
    return this.userService.signIn(body);
  }
}
