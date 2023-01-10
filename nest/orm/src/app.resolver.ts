import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Comment } from './comment.entity';
import { Message } from './constants/message';
import { UserWithComments } from './user-with-comment';
import { User } from './user.entity';

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

  @Query((_) => [UserWithComments])
  getUsersWithComments(): Promise<UserWithComments[]> {
    return this.appService.getUsersWithComments();
  }

  @Mutation((_) => Comment)
  createComment(
    @Args('userId') userId: string,
    @Args('description') description: string,
  ): Promise<Comment> {
    return this.appService.createComment(userId, description);
  }
}
