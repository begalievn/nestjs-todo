import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: { type: String },
  completed: { type: Boolean, defaultValue: false }
})

export interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
