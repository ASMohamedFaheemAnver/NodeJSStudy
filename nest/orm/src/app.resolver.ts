import { Controller, Get } from '@nestjs/common';
import { Query, Resolver, Root } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Message } from './constants/message';
import { User } from './entities/user.entity';

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
}
