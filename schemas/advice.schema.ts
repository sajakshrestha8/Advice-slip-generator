import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

@Entity()
export class Advice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  advice: string;

  @Column({ type: 'text', enum: AdviceCategory })
  category: AdviceCategory;

  @Column({ type: 'text', enum: AdviceFeeling })
  feeling: AdviceFeeling;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
