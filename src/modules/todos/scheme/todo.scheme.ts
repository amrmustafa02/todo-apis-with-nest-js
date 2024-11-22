import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    type: Boolean,
  })
  completed: boolean;

  @Prop({
    required: true,
    type: Date,
  })
  date: Date;

  @Prop({
    required: true,
    // type: Schema.Types.ObjectId,
    type: String,
  })
  userId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
