import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as dotenv from 'dotenv';
dotenv.config()
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,
       {
      provide: 'SECURITY_MS',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: `redis://${process.env.REDIS_QUEUE_HOST}:${+process.env.REDIS_QUEUE_PORT}`,
          },
        }),
    },
  ],
})
export class AppModule {}
