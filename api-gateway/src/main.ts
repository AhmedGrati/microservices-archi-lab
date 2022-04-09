import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: true,
      credentials: true
    }
  )
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
