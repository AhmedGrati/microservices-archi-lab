import { User } from "./user";

export interface LoginResponse {
    access_token: string;
    user: User;
}