import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isDevelopment = process.env.NODE_ENV === 'development';
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: isDevelopment,
      // whitelist: true,
      skipUndefinedProperties: true,
      transform: true,
    }),
  );
  await app.use(cookieParser(process.env.COOKIE_SECRET));
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    credentials: true,
  });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: !isDevelopment,
      contentSecurityPolicy: !isDevelopment,
    }),
  );
  await app.listen(process.env.PORT, () =>
    console.log(`Server started on port = ${process.env.PORT}`),
  );
}

bootstrap();
