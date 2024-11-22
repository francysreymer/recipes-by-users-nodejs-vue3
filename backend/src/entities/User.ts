import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
@Unique(['login'])
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '\n' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nome: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  login: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  senha: string;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  criado_em: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  alterado_em: Date;
}
