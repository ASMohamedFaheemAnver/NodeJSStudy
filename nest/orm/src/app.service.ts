import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { UserWithComments } from './user-with-comment';
import { User } from './user.entity';
import { In } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {
    // this.userRepository.find().then((users) => {
    //   users.forEach((user) => {
    //     this.commentRepository.save({
    //       user,
    //       description: Math.round(Math.random() * 100).toString(),
    //     });
    //   });
    // });
  }
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async getUsersWithComments(): Promise<UserWithComments[]> {
    const qb = this.userRepository.createQueryBuilder('user');
    // .leftJoinAndSelect('user.comments', 'comments');
    const results = await qb.getMany();
    const ids = results.map((raw) => raw.id);
    const commentQb = this.commentRepository
      .createQueryBuilder('comment')
      .select(['comment.id', 'comment.description', 'user.id'])
      .where('comment.userId in (:ids)', { ids })
      .leftJoin('comment.user', 'user');
    const comments = await commentQb.getMany();
    console.log({ comments });
    return results;
  }
}
