import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, NotFoundException } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./entities/todo.model";
import { CreateTodoDto } from "./dto/createTodo.dto";
import { UpdateTodoDto } from "./dto/updateTodo.dto";

@Controller('todos')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    try {
      const result = this.todoService.getAllTodos();
      return result;
    } catch(e) {
      throw new NotFoundException();
    }
  }

  @Post()
  addTodo(@Body() todo: CreateTodoDto) {
    const generatedId = this.todoService.addTodo(todo);
    return generatedId;
  }

  @Get(':id')
  getTodoById(@Param('id') id: string) {
    const todo = this.todoService.findTodoById(id);
    return todo;
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() todo: UpdateTodoDto) {
    const updatedTodo = this.todoService.updateTodoById(id, todo);
    return updatedTodo;
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    const removedTodo = this.todoService.removeTodoById(id);
    return removedTodo;
  }
}
