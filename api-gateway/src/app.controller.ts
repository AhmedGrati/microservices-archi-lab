import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CredentialsInput } from './dto/credentials.input';
import { RegisterInput } from './dto/register.input';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth/login')
  login(@Body() credentials: CredentialsInput,@Res() response) {
    return this.appService.login(credentials, response);
  }
  @Post('/auth/register')
  register(@Body() registerInput: RegisterInput,@Res() response) {
    return this.appService.register(registerInput, response);
  }
  @Get('/forecast/all-products')
  getAllProducts(@Res() response) {
    return this.appService.getAllProducts(response);
  }
  @Get('/forecast/')
  forecast(@Res() response) {
    return this.appService.forecast(response);
  }
}
