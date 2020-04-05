import { Length, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EditMessageDTO {
  @ApiProperty({
    minLength: 3,
  })
  @IsNotEmpty()
  @Length(3)
  text: string;
}
