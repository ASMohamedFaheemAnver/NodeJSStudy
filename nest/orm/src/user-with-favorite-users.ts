import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@ObjectType()
export class UserWithFavoriteUsers extends User {
  @Field(() => [User])
  favorites: User[];
}
