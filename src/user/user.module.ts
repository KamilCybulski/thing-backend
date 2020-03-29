import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserSubscriber } from './user.subscriber';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, UserSubscriber],
  controllers: [UserController],
  exports: [UserService, UserSubscriber],
})
export class UserModule {}
