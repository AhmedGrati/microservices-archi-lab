import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
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
  await app.listen();
}
bootstrap();
