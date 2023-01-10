import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@ObjectType()
@Entity()
export class User {
  @Field((_) => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: ['insert', 'update'],
  })
  comments: Comment[];
}