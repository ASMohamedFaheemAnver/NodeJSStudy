import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachment } from './attachment.entity';
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

  @OneToOne(() => Attachment, (profile) => profile.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  profile: Attachment;

  @OneToOne(() => Attachment, (profile) => profile.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  cover: Attachment;

  @ManyToMany(() => User)
  @JoinTable()
  favorites: User[];
}
