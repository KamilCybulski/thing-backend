import { IsNotEmpty, MinLength } from 'class-validator';

export class MessageDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  text: string;
}
