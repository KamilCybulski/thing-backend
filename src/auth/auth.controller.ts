import { Body, Controller, Get, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'src/user/dtos';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dtos';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/signup')
  signUp(@Body() body: CredentialsDTO): Promise<void> {
    return this.authService.signUp(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  @HttpCode(200)
  signIn(@GetUser('http') user: User) {
    return this.authService.signIn(user.toDTO());
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@GetUser('http') user: User): UserDTO {
    return user.toDTO();
  }
}
