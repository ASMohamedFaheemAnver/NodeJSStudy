import { BadRequestException } from '@nestjs/common';
import { IsArray } from 'class-validator';

// Decorator for validating string type
function IsString(target: any, propertyKey: string) {
  let value = target[propertyKey];
  const getter = function () {
    return value;
  };
  const setter = function (newVal: any) {
    if (typeof newVal !== 'string') {
      throw new BadRequestException(
        `Invalid type. ${propertyKey} must be a string.`,
      );
    }
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  // Basic email format validation, you can use a more robust regex here
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Decorator for validating email format
function IsEmail(target: any, propertyKey: string) {
  let value = target[propertyKey];

  const getter = function () {
    return value;
  };

  const setter = function (newVal: any) {
    if (!isValidEmail(newVal)) {
      throw new BadRequestException(`Invalid email format for ${propertyKey}.`);
    }
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

// Example usage of decorators
export class CreateUserDto {
  // @IsString
  private name: string;
  // @IsEmail
  @IsArray()
  private email: string;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
