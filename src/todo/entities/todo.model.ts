import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, SchemaTypes } from "mongoose";
import { User } from "../../users/entities/user.model";

export type TodoDocument = HydratedDocument<Todo>;


@Schema()
export class Todo {

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  completed: boolean

  @Prop({type: SchemaTypes.ObjectId, ref: User.name})
  user: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
