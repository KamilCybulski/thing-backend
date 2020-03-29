import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dtos';
import { UserService } from 'src/user/user.service';
import { CredentialsDTO } from './dtos';
import { User } from 'src/user/user.entity';
import { SignInResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  signUp(dto: CredentialsDTO): Promise<void> {
    return this.userService.create(dto);
  }

  signIn(dto: UserDTO): SignInResponse {
    const accessToken = this.jwtService.sign(dto);
    return new SignInResponse(accessToken);
  }

  async validateCredentials(username: string, password: string): Promise<User> {
    const user = await this.userService.findByName(username);
    if (!user || !await user.validatePassword(password)) throw new UnauthorizedException();
    return user;
  }

  async validateJWT(userId: number): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
