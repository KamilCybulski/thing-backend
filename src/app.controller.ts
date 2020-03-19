import { Controller, Get, Body, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDTO } from './message/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createHello(@Body(ValidationPipe) dto: MessageDTO) {
    return dto;
  }
}
