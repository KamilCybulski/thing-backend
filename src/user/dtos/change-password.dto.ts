import { Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDTO {
  @ApiProperty({
    minLength: 8,
    maxLength: 20,
  })
  @Length(8, 20)
  password: string;
}