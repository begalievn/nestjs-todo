import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoSchema, Todo } from './entities/todo.model';
import { TodoRepository } from "./todo.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository]
})
export class TodoModule {}
