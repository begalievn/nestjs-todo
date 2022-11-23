import { Injectable, NotFoundException } from "@nestjs/common";
import { TodoRepository } from "./todo.repository";
import { UpdateTodoDto } from "./dto/updateTodo.dto";


@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository) {
  }

  async addTodo(todo) {
    const result = await this.todoRepository.addTodo(todo);
    return result;
  }

  async getAllTodos() {
    const todos = await this.todoRepository.getAllTodos();
    return todos;
  }

  async findTodoById(id) {
    const todo = this.todoRepository.findTodoById(id);
    return todo;
  }

  async updateTodoById(id: string, todo: UpdateTodoDto) {
    try {
      const updatedTodo = await this.todoRepository.findByIdAndUpdate(id, todo);
      return updatedTodo;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async removeTodoById(id: string) {
    try {
      const deletedTodo = await this.todoRepository.findByIdAndRemove(id);
      return deletedTodo;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
