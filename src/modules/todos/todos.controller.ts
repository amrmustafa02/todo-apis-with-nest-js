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
import { CreateTodoDTO } from './dto/createTodo-dto';
import { TodosService } from './todos.service';
import { UpdateTodoDTO } from './dto/updateTodo-dto';
import { AuthGuard } from '../../core/guard/auth.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('todos')
@UseGuards(AuthGuard)
@ApiTags('Todos')
@ApiBearerAuth()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add a new todo' }) // Description for the endpoint
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
  }) // Success response description
  @ApiResponse({ status: 400, description: 'Validation failed.' }) // Error response description
  addTodo(@Request() req, @Body() todo: CreateTodoDTO) {
    return this.todosService.addTodo(req.user.id, todo);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all todos for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Returns all todos for the user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getAllTodos(@Request() req) {
    return this.todosService.getAllTodos(req.user.id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an existing todo' })
  @ApiParam({ name: 'id', description: 'The ID of the todo to update' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  updateTodo(
    @Request() req,
    @Body() updateTodoDto: UpdateTodoDTO,
    @Param('id') todoId: string,
  ) {
    return this.todosService.updateTodo(req.user.id, todoId, updateTodoDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiParam({ name: 'id', description: 'The ID of the todo to delete' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  deleteTodo(@Request() req, @Param('id') todoId: string) {
    return this.todosService.deleteTodo(req.user.id, todoId);
  }
}
