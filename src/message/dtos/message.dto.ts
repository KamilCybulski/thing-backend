import { UserDTO } from "src/user/dtos";

export class MessageDTO {
  text: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user: UserDTO;
}
