import { IsDateString, MinLength } from 'class-validator';

export class CreateTodoDTO {
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  description: string;

  // @Transform(({ value }) => new Date(value))
  @IsDateString()
  date: Date;
}
