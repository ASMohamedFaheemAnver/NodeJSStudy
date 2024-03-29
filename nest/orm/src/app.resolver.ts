import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Comment } from './comment.entity';
import { Message } from './constants/message';
import { UserWithAttachment } from './user-with-attachment';
import { UserWithComments } from './user-with-comment';
import { User } from './user.entity';
import { UserWithFavoriteUsers } from './user-with-favorite-users';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}
  @Query((_) => Message)
  root(): Message {
    return {
      message: `server is up and running in ${process.env.NODE_ENV} mode`,
    };
  }

  @Query((_) => [User])
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }

  @Mutation((_) => User)
  createUser(@Args('name') name: string): Promise<User> {
    return this.appService.createUser(name);
  }

  @Mutation((_) => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('name') name: string,
    @Args('imageUrl') imageUrl: string,
    @Args('coverUrl') coverUrl: string,
    @Args('boolean') boolean: boolean,
  ): Promise<User> {
    return this.appService.updateUser(
      userId,
      name,
      imageUrl,
      coverUrl,
      boolean,
    );
  }

  @Query((_) => [UserWithComments])
  getUsersWithComments(): Promise<UserWithComments[]> {
    return this.appService.getUsersWithComments();
  }

  @Query((_) => [UserWithAttachment])
  getUsersWithAttachments(): Promise<UserWithAttachment[]> {
    return this.appService.getUsersWithAttachments();
  }

  @Query((_) => [UserWithFavoriteUsers])
  getUserWithFavoriteUsers(): Promise<UserWithFavoriteUsers[]> {
    return this.appService.getUserWithFavoriteUsers();
  }

  @Mutation((_) => Comment)
  createComment(
    @Args('userId') userId: string,
    @Args('description') description: string,
  ): Promise<Comment> {
    return this.appService.createComment(userId, description);
  }
}
