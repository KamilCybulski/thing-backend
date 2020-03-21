import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
