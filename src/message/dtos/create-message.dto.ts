import { IsNotEmpty } from 'class-validator';

export class CreateMessageDTO {
  @IsNotEmpty()
  text: string;
}
