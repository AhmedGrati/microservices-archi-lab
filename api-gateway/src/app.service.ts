import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { map } from 'rxjs';
import { CredentialsInput } from './dto/credentials.input';
import { RegisterInput } from './dto/register.input';
import { TokenModel } from './dto/token.model';

@Injectable()
export class AppService {
  constructor(
    @Inject('SECURITY_MS') private readonly securityClient: ClientProxy
  ) {}
  async login(credentials: CredentialsInput, response: Response) {
    return this.securityClient.send('login', credentials)
          .subscribe((data) => response.status(HttpStatus.OK).send(data));
  }

  async register(registerInput: RegisterInput, response: Response) {
    return this.securityClient.send('register', registerInput)
            .subscribe((data) => response.status(HttpStatus.OK).send(data))
  }
  async getAllProducts(response: Response) {
    return this.securityClient.send('get_all_products',{})
            .subscribe((data) => response.status(HttpStatus.OK).send(data))
  }

  async forecast(response: Response) {
    return this.securityClient.send('forecast',{})
            .subscribe((data) => response.status(HttpStatus.OK).send(data))

  }



}
