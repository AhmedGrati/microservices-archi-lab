import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CredentialsInput } from './dto/credentials.input';
import { PayloadInterface } from './dto/payload.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenModel } from './dto/token.model';
import { RegisterInput } from './dto/register.input';
import { ErrorResponse } from './dto/error.response';
@Injectable()
export class AuthService {
  
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  async generateJwtToken(payload: PayloadInterface) {
    return await this.jwtService.sign(payload);
  }
  async login(credentials: CredentialsInput): Promise<TokenModel | ErrorResponse> {
    const {email, password} = credentials;
    const user = await this.userService.findOneByEmail(email)

    // if the user is null is means that we don't have any user with that email or password
    if (!user) {
      return {
        message: "USER DOES NOT EXIST",
        status: HttpStatus.NOT_FOUND
      }
    } else {
      // if we get the user
      const hashedPassword = await bcrypt.hash(password, user.salt);
      // if the password is correct we sign the jwt and return it from the payload
      if (hashedPassword === user.password) {
        const payload: PayloadInterface = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };
        const accessToken = await this.generateJwtToken(
          payload,
        );
        // return result
        return {
          access_token: accessToken,
          user,
        };
      } else {
        // if the password is not equal to user.password that means that the credentials are not true
        return {
          message: "MISMATCH BETWEEN EMAIL AND PASSWORD! RETRY LATER!",
          status: HttpStatus.FORBIDDEN
        }
      }
    }
  }

  async register(registerInput: RegisterInput) {
    return this.userService.create(registerInput);
  }
}
