import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDTO } from './createTodo-dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, MinLength } from 'class-validator';

export class UpdateTodoDTO {
  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Buy groceries',
    minLength: 3,
    required: false, // Optional field
  })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @ApiProperty({
    description: 'The description of the todo item',
    example: 'Milk, Bread, Eggs',
    minLength: 5,
    required: false, // Optional field
  })
  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  description: string;

  @ApiProperty({
    description: 'The due date for the todo item in ISO 8601 format',
    example: '2024-11-25T10:00:00Z',
    required: false, // Optional field
  })
  // @Transform(({ value }) => new Date(value))
  @IsDateString()
  date: Date;
  @ApiProperty({
    description: 'Indicates if the todo item is completed',
    example: true,
    required: false, // Optional field
  })
  @IsBoolean({ message: 'Completed must be a boolean value' })
  completed?: boolean;
}
