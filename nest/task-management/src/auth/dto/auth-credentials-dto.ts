import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  user_name: string;
  @IsString()
  @MinLength(8)
  @MaxLength(32, { message: 'password must be lower than 32 charectors' })
  // @Matches(/$/) // RegEx
  password: string;
}
