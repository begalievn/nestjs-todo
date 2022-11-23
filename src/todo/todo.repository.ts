import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './entities/todo.model';
import { UpdateTodoDto } from "./dto/updateTodo.dto";

@Injectable()
export class TodoRepository {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

  async addTodo(todo: Todo) {
    const newTodo = new this.todoModel(todo);
    const result = await newTodo.save()
    return result.id;
  }

  async getAllTodos() {
    const result = this.todoModel.find();
    return result;
  }

  async findTodoById(id: string) {
    const result = await this.todoModel.findById(id).exec();
    return result;
  }

  async findByIdAndUpdate(id: string, todo: UpdateTodoDto) {
    const result = await this.todoModel.findByIdAndUpdate(id, todo, { new: true });
    return result;
  }

  async findByIdAndRemove(id) {
    const result = await this.todoModel.findByIdAndRemove(id);
    return result;
  }

}
