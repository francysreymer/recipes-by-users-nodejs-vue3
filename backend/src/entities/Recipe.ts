import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Category } from '@/entities/Category';
import { User } from '@/entities/User';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'varchar', length: 45, nullable: true })
  name: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  preparation_time_minutes: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  servings: number;

  @Column({ type: 'text', nullable: false })
  preparation_method: string;

  @Column({ type: 'text', nullable: true })
  ingredients: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
