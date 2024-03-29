import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @OneToMany((_) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
