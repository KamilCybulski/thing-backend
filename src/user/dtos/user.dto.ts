import { User } from "../user.entity";

export type UserDTO = Pick<User, 'name' | 'id' | 'createdAt'>;
