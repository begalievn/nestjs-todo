import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Todo } from './todo.model';


@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async addTodo(todo) {
    const newTodo = new this.todoModel(todo);
    const result = await newTodo.save()
    console.log(result);
    return result.id;
  }

  async getAllTodos() {
    const todos = await this.todoModel.find();
    return todos;
  }

  async findTodoById(id) {
    const todo = await this.todoModel.findById(id).exec();
    return todo;
  }

  async updateTodoById(id: string, todo: Todo) {
    try {
      const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todo);
      return updatedTodo;
    } catch(e) {
      throw new NotFoundException();
    }
  }

  async removeTodoById(id: string) {
    try {
      const deletedTodo = await this.todoModel.findByIdAndRemove(id);
      return deletedTodo;
    } catch(e) {
      throw new NotFoundException();
    }
  }
}
