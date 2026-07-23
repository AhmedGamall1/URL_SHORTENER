import 'dotenv/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: () => new BadRequestException({ error: 'INVALID_URL' }),
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
