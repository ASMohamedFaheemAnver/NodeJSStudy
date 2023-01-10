import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Attachment {
  @Field((_) => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field()
  @Column()
  url: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
