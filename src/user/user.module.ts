import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from 'src/config';
import { LocalStrategy, JwtStrategy } from './auth-strategies';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register(jwtConfig),
    PassportModule
  ],
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
