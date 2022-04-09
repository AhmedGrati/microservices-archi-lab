import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CredentialsInput } from './dto/credentials.input';
import { RegisterInput } from './dto/register.input';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('login')
  login(@Body() credentials: CredentialsInput) {
    return this.authService.login(credentials);
  }

  @EventPattern('register')
  register(@Body() registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
