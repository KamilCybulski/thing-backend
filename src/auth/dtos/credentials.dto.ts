import { Length } from 'class-validator';
import {  ApiProperty} from '@nestjs/swagger';

export class CredentialsDTO {
  @ApiProperty({
    minLength: 3,
    maxLength: 20,
  })
  @Length(3, 20)
  username: string;

  @ApiProperty({
    minLength: 8,
    maxLength: 20,
  })
  @Length(8, 20)
  password: string;
}
