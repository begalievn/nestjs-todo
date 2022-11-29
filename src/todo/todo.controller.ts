import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/createTodo.dto";
import { UpdateTodoDto } from "./dto/updateTodo.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("todos")
@UseGuards(JwtAuthGuard)
export class TodoController {

  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  getAllTodos(@Request() req) {
      const result = this.todoService.getAllTodos({ user: req.user.userId });
      return result;
  }

  @Post()
  addTodo(@Request() req, @Body() todo: CreateTodoDto) {
    const user = req.user.userId;
    const generatedId = this.todoService.addTodo(user, todo);
    return generatedId;
  }

  @Get(":id")
  getTodoById(@Request() req, @Param("id") id: string) {
    const todo = this.todoService.findTodoById({ _id: id, user: req.user.userId });
    return todo;
  }

  @Put(":id")
  updateTodo(@Request() req, @Param("id") id: string, @Body() todo: UpdateTodoDto) {
    const updatedTodo = this.todoService.updateTodoById({ _id: id, user: req.user.userId }, todo);
    return updatedTodo;
  }

  @Delete(":id")
  deleteTodo(@Request() req, @Param("id") id: string) {
    const removedTodo = this.todoService.removeTodoById({ _id: id, user: req.user.userId });
    return removedTodo;
  }
}
