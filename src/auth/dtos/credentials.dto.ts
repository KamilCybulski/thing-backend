import { Length } from 'class-validator';

export class CredentialsDTO {
  @Length(3, 20)
  username: string;

  @Length(8, 20)
  password: string;
}
