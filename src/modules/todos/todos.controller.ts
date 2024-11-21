import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/core/guard/auth.guard';
import { CreateTodoDTO } from './dto/createTodo-dto';
import { TodosService } from './todos.service';
import { UpdateTodoDTO } from './dto/updateTodo-dto';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Post('add')
  addTodo(@Request() req, @Body() todo: CreateTodoDTO) {
    return this.todosService.addTodo(req.user.id, todo);
  }

  @Get('all')
  getAllTodos(@Request() req) {
    return this.todosService.getAllTodos(req.user.id);
  }

  @Patch('update/:id')
  updateTodo(@Request() req, @Body() updateTodoDto: UpdateTodoDTO, @Param('id') todoId) {
    return this.todosService.updateTodo(req.user.id, todoId, updateTodoDto);
  }
  @Delete('delete/:id')
  deleteTodo(@Request() req, @Param('id') todoId) {
    return this.todosService.deleteTodo(req.user.id, todoId);
  }
}
