import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {EnvironmentVariables} from '../../common/EnvironmentVariables';
import {PayloadInterface} from '../dto/payload.interface';
import {UserService} from '../../user/user.service';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../../user/entities/user.entity';
import {Repository} from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: PayloadInterface) {
    const email: string = payload.email;
    const user = await this.userService.findOneByEmail(email);

    // if the user is not null or undefined which means that we find it
    if (user) {
      delete user.password;
      return user;
    } else {
      // if we don't find the user it means that he's unauthorized
      throw new UnauthorizedException();
    }
  }
}