import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // transform will be invoked
  // Where let entity = classTransformer.plainToClass(metatype, value, this.transformOptions); which try to create class instance from the body
  // Which triggers out custom validator
  // But class-validator sets meta tags and validation pipe uses it to validate I guess, that's why meta validation giving more than 1 validation error
  // Where custom validation giving/throwing 1 error at a time/request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
