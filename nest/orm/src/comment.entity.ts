import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Comment {
  @Field((_) => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field()
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
