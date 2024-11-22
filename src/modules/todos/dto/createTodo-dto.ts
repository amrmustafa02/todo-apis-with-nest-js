import { IsDateString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateTodoDTO {
  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Buy groceries',
    minLength: 3,
  })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @ApiProperty({
    description: 'The description of the todo item',
    example: 'Milk, Bread, Eggs',
    minLength: 5,
  })
  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  description: string;

  @ApiProperty({
    description: 'The due date for the todo item in ISO 8601 format',
    example: '2024-11-25T10:00:00Z',
  })
  // @Transform(({ value }) => new Date(value))
  @IsDateString()
  date: Date;
}
