import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
