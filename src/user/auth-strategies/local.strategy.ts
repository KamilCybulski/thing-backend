import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDTO } from '../dtos';
import { UserService } from '../user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDTO> {
    const user = await this.userService.findByName(username);
    if (user && user.password === password) {
      return user.toDTO();
    } else {
      throw new UnauthorizedException();
    }
  }
}
