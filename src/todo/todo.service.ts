import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateTodoDto } from "./dto/updateTodo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Todo, TodoDocument } from "./entities/todo.model";
import { Model, Types } from "mongoose";


@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {
  }

  async addTodo(user, todo) {
    const newTodo = { ...todo, user };
    const result = await this.todoModel.create(newTodo);
    return result._id;
  }

  async getAllTodos(searchQuery) {
    const result = await this.todoModel.find(searchQuery);
    return result;
  }

  async findTodoById(searchQuery) {
    if (!Types.ObjectId.isValid(searchQuery._id)) {
      throw new BadRequestException("Not valid id of a todo");
    }
    const result = await this.todoModel.find(searchQuery);

    if(!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async updateTodoById(searchQuery, todo: UpdateTodoDto) {
    if (!Types.ObjectId.isValid(searchQuery._id)) {
      throw new BadRequestException("Not valid id of a todo");
    }
    try {
      const result = await this.todoModel.findOneAndUpdate(searchQuery, todo, { new: true });
      return result;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async removeTodoById(searchQuery) {
    if (!Types.ObjectId.isValid(searchQuery._id)) {
      throw new BadRequestException("Not valid id of a todo");
    }
    try {
      const result = await this.todoModel.findOneAndRemove(searchQuery);
      return result;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
