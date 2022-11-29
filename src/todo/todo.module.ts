import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoSchema, Todo } from './entities/todo.model';
import { TodoRepository } from "./todo.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema }
    ]),
    AuthModule
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository]
})
export class TodoModule {}
