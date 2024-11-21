import { IsDateString, MinLength } from 'class-validator';

export class CreateTodoDTO {
  @MinLength(3)
  title: String;

  @MinLength(5)
  description: String;

  @IsDateString()
  date: Date;
}
