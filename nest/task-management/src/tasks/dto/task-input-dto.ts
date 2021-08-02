import { IsNotEmpty } from 'class-validator';

export class TaskInputDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
