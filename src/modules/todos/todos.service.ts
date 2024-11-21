import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/createTodo-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './scheme/todo.scheme';
import { GlobalErrorHandler } from 'src/core/error/global-error-handler';
import { TodoResponseDto } from './dto/todo.response';
import { UpdateTodoDTO } from './dto/updateTodo-dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: any) {}

  async getAllTodos(userId: string) {
    try {
      var result = await this.todoModel.find({ userId });
      return {
        message: 'Todos fetched successfully',
        data: result.map((todo) => new TodoResponseDto(todo)),
      };
    } catch (error) {
      GlobalErrorHandler.catch(error);
    }
  }
  
  async addTodo(userId: String, todoDto: CreateTodoDTO) {
    const todo = new this.todoModel({
      ...todoDto,
      completed: false,
      userId: userId,
    });
    try {
      var result = await todo.save();
      return {
        message: 'Todo created successfully',
        data: new TodoResponseDto(result),
      };
    } catch (error) {
      GlobalErrorHandler.catch(error);
    }
  }
  async updateTodo(
    userId: String,
    todoId: String,
    updateTodoDto: UpdateTodoDTO,
  ) {
    try {
      var result = await this.todoModel.findByIdAndUpdate(
        { _id: todoId, userId: userId },
        updateTodoDto,
      );
      if (!result) {
        throw new HttpException('Todo does not exist', HttpStatus.BAD_REQUEST);
      }
      return {
        message: 'Todo updated successfully',
      };
    } catch (error) {
      GlobalErrorHandler.catch(error);
    }
  }
  async deleteTodo(userId: String, todoId: String) {
    try {
      var result = await this.todoModel.findByIdAndDelete({
        _id: todoId,
        userId: userId,
      });
      if (!result) {
        throw new HttpException('Todo does not exist', HttpStatus.BAD_REQUEST);
      }
      return {
        message: 'Todo deleted successfully',
      };
    } catch (error) {
      GlobalErrorHandler.catch(error);
    }
  }
}
