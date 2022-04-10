import { Options } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform.interceptor';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: `redis://${process.env.REDIS_QUEUE_HOST}:${process.env.REDIS_QUEUE_PORT}`,
      }
    },
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen();
}
bootstrap();
