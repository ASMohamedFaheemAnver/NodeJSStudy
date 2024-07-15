import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TrimPipe } from './pipes/trim.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new TrimPipe()); // Example pipe
  // transform will be invoked
  // Where let entity = classTransformer.plainToClass(metatype, value, this.transformOptions); which try to create class instance from the body
  // Which triggers out custom validator/by constructor call but in this case
  // Where custom validation giving/throwing 1 error at a time/request
  // But validation pipe does this
  // const errors = await this.validate(entity, this.validatorOptions);
  // if (errors.length > 0) {
  //     throw await this.exceptionFactory(errors);
  // }
  // It's using class-validator validate class to validate them and throw a BadRequest error with error messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
