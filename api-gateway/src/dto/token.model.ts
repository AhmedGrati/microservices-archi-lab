import { User } from "src/entities/user.entity";

export interface TokenModel {
  access_token: string;
  user: User;
}