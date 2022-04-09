import {User} from '../../user/entities/user.entity';

export interface TokenModel {
  access_token: string;
  user: User;
}