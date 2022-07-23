import { IsEmail, IsString, MinLength, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @ValidateIf((object, value) => {
    return !object?.password;
  })
  @IsEmail(undefined, { message: 'email must be valid' })
  email: string;

  @ValidateIf((object, value) => {
    return !object.email;
  })
  @IsString()
  @MinLength(8)
  password: string;
}
