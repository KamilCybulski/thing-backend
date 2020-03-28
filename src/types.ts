import { UserDTO } from "./user/dtos";

export interface UserPresence extends UserDTO {
  active: boolean; 
}
