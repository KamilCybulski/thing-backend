import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MessageModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
