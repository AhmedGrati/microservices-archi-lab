import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

dotenv.config();
@Module({
  imports: [
    JwtModule.register({
      signOptions: {expiresIn: 3600},
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
