import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@ObjectType()
export class UserWithComments extends User {
  @Field(() => [Comment])
  comments: Comment[];
}
