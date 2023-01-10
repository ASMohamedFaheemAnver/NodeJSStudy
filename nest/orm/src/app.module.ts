import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { Attachment } from './attachment.entity';
import { Comment } from './comment.entity';
import { type, host, port, username, password, database } from './config';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type,
      host,
      port,
      username,
      password,
      database,
      entities: [User, Comment, Attachment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Comment, Attachment]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV !== 'prod',
      introspection: true,
    }),
  ],
  controllers: [],
  providers: [AppResolver, AppService],
})
export class AppModule {}
