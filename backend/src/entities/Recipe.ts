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

@Entity('receitas')
export class Recipe {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_usuarios' })
  id_usuarios: User;

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_categorias' })
  id_categorias: Category;

  @Column({ type: 'varchar', length: 45, nullable: true })
  nome: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  tempo_preparo_minutos: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  porcoes: number;

  @Column({ type: 'text', nullable: false })
  modo_preparo: string;

  @Column({ type: 'text', nullable: true })
  ingredientes: string;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  criado_em: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  alterado_em: Date;
}
