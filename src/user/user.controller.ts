import { Controller, UseGuards, Post, HttpCode, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './user.entity';
import { ChangePasswordDTO, UserDTO } from './dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  @ApiResponse({ status: 200, description: 'User data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getUser(@GetUser('http') user: User): UserDTO {
    return user.toDTO();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/change-password')
  @HttpCode(200)
  @ApiBody({ type: ChangePasswordDTO })
  changePassword(@Body() dto: ChangePasswordDTO, @GetUser('http') user: User): Promise<void> {
    return this.userService.changePassword(dto, user);
  }
}
