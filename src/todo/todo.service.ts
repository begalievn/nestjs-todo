import { Injectable, NotFoundException } from "@nestjs/common";
import { TodoRepository } from "./todo.repository";
import { UpdateTodoDto } from "./dto/updateTodo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Todo, TodoDocument } from "./entities/todo.model";
import { Model } from "mongoose";


@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {
  }

  async addTodo(todo) {
    // const newTodo = new this.todoModel(todo);
    // const result = await newTodo.save()
    const result = await this.todoModel.create(todo);
    console.log(result);
    return result._id;
  }

  async getAllTodos() {
    const result = await this.todoModel.find();
    return result;
  }

  async findTodoById(id) {
    const result = await this.todoModel.findById(id).exec();
    return result;
  }

  async updateTodoById(id: string, todo: UpdateTodoDto) {
    try {
      const result = await this.todoModel.findByIdAndUpdate(id, todo, { new: true });
      return result;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async removeTodoById(id: string) {
    try {
      const result = await this.todoModel.findByIdAndRemove(id);
      return result;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
