import { IsNotEmpty } from 'class-validator';

export class MessageDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  text: string;
}
