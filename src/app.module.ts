import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppGateway } from './app.gateway';
import { TypeOrmConfigService } from './config';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MessageModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
