import {
  ArgumentMetadata,
  Injectable,
  Optional,
  PipeTransform,
  ValidationPipeOptions,
} from '@nestjs/common';
// Ref
// https://stackoverflow.com/questions/63766390/using-nest-js-i-would-like-to-trim-all-body-input-values
@Injectable()
export class TrimPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private trim(values: any) {
    Object.keys(values).forEach((key) => {
      if (this.isObj(values[key])) {
        values[key] = this.trim(values[key]);
      } else {
        if (typeof values[key] === 'string') {
          values[key] = values[key].trim();
        }
      }
    });
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type, metatype } = metadata;
    console.log({ values, metadata });
    // let entity = classTransformer.plainToClass(metatype, value, this.transformOptions);
    // const errors = await this.validate(entity, this.validatorOptions);
    // if (errors.length > 0) {
    //     throw await this.exceptionFactory(errors);
    // }

    if (this.isObj(values) && type === 'body') {
      return this.trim(values);
    }
    return values;
  }
}
