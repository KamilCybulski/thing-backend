import { Body, Controller, HttpCode, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCredentialsDTO, UserDTO } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() body: UserCredentialsDTO): Promise<UserDTO> {
    const user = await this.userService.create(body);
    return user.toDTO();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  @HttpCode(200)
  signIn(@Request() req) {
    return this.userService.signIn(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@Request() req) {
    return req.user;
  }
}
