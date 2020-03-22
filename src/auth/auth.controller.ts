import { Body, Controller, Get, HttpCode, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'src/user/dtos';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/signup')
  async signUp(@Body() body: CredentialsDTO): Promise<UserDTO> {
    const user = await this.authService.signUp(body);
    return user.toDTO();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  @HttpCode(200)
  signIn(@Request() req: { user: UserDTO }) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@Request() req: { user: UserDTO }): UserDTO {
    return req.user;
  }
}
