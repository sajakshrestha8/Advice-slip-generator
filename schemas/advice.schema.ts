import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type AdviceDocument = HydratedDocument<Advice>;

export enum AdviceCategory {
  CAREER = 'career',
  RELATIONSHIP = 'relationship',
  HEALTH = 'health',
  FINANCE = 'finance',
  CREATIVITY = 'creativity',
  MINDSET = 'mindset',
}

export enum AdviceFeeling {
  MOTIVATED = 'motivated',
  CALM = 'calm',
  CURIOUS = 'curious',
  ANXIOUS = 'anxious',
  HAPPY = 'happy',
  STUCK = 'stuck',
}

@Schema({ timestamps: true })
export class Advice {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  id: string;

  @Prop({ type: String, required: true })
  advice: string;

  @Prop({ type: String, enum: AdviceCategory, required: true })
  category: AdviceCategory;

  @Prop({ type: String, enum: AdviceFeeling, required: true })
  feeling: AdviceFeeling;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export const AdviceSchema = SchemaFactory.createForClass(Advice);
