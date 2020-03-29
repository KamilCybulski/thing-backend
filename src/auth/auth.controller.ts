import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'src/user/dtos';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dtos';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/user.entity';
import { SignInResponse } from './types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/signup')
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  signUp(@Body() body: CredentialsDTO): Promise<void> {
    return this.authService.signUp(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  @HttpCode(200)
  @ApiBody({ type: CredentialsDTO })
  @ApiResponse({ status: 200, type: SignInResponse })
  @ApiResponse({ status: 401, description: 'Unautorized' })
  signIn(@GetUser('http') user: User): SignInResponse {
    return this.authService.signIn(user.toDTO());
  }
}
