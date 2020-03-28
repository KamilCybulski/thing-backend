import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDTO {
  @ApiProperty()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
