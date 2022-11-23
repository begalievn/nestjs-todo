import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";

export type TodoDocument = HydratedDocument<Todo>;


@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  completed: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

// export const TodoSchema = new mongoose.Schema({
//   title: {type: String, required: true},
//   description: { type: String },
//   completed: { type: Boolean, defaultValue: false }
// })
//
//
//
// export interface Todo {
//   title: string;
//   description: string;
//   completed: boolean;
// }
