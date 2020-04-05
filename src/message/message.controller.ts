import { Controller, Patch, Param, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/user.entity';
import { MessageService } from './message.service';
import { EditMessageDTO } from './dtos/edit-message.dto';
import { MessageDTO } from './dtos';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiBearerAuth()
  @ApiBody({ type: EditMessageDTO })
  @ApiResponse({ status: 200, type: MessageDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Patch('edit/:id')
  edit(
    @Param('id') id: number,
    @Body() dto: EditMessageDTO,
    @GetUser('http') user: User,
  ): Promise<MessageDTO> {
    return this.messageService.editMessage(id, dto, user);
  }
}
