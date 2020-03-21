import { Length } from "class-validator";

export class UserCredentialsDTO {
  @Length(3, 20)
  name: string;

  @Length(8, 20)
  password: string;
}
