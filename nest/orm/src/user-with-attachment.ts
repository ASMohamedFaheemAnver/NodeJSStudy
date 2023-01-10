import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Attachment } from './attachment.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@ObjectType()
export class UserWithAttachment extends User {
  @Field(() => Attachment, { nullable: true })
  profile: Attachment;

  @Field(() => Attachment, { nullable: true })
  cover: Attachment;
}
