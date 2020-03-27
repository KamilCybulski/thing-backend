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
import { SignInResponseDTO } from './dtos/sign-in-response.dto';

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
  @ApiResponse({ status: 200, type: SignInResponseDTO })
  @ApiResponse({ status: 401, description: 'Unautorized' })
  signIn(@GetUser('http') user: User): SignInResponseDTO {
    return this.authService.signIn(user.toDTO());
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@GetUser('http') user: User): UserDTO {
    return user.toDTO();
  }
}
