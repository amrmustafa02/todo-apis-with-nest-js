import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDTO } from './createTodo-dto';
import { IsBoolean } from 'class-validator';

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {
  @IsBoolean()
  completed?: boolean;
}
