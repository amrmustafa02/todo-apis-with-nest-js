import { IsBoolean, IsDateString, MinLength } from 'class-validator';

export class UpdateTodoDTO {
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  description: string;

  @IsDateString()
  date: Date;

  @IsBoolean({ message: 'Completed must be a boolean value' })
  completed?: boolean;
}
