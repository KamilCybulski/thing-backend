import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDTO } from 'src/user/dtos';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string): Promise<UserDTO> {
    return this.authService.validateCredentials(username, password);
  }
}