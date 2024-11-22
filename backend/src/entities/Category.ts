import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('categorias')
@Unique(['nome'])
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nome: string;
}
