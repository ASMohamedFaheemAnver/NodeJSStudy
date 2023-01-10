import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { UserWithComments } from './user-with-comment';
import { User } from './user.entity';
import { In } from 'typeorm';
import { UserWithAttachment } from './user-with-attachment';
import { Attachment } from './attachment.entity';

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

  async createUser(name: string): Promise<User> {
    return await this.userRepository.save({ name });
  }

  async getUsersWithComments(): Promise<UserWithComments[]> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.comments', 'comments');
    const results = await qb.getMany();
    return results;
  }

  async getUsersWithAttachments(): Promise<UserWithAttachment[]> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.cover', 'cover');
    const results = await qb.getMany();
    return results;
  }

  async createComment(userId: string, description: string): Promise<Comment> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['comments'],
    });
    const newComment = new Comment();
    newComment.description = description;
    user.comments.push(newComment);
    await this.userRepository.save(user);
    return newComment;
  }

  async updateUser(
    userId: string,
    name: string,
    imageUrl: string,
    coverUrl: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['comments'],
    });
    user.name = name;
    const profile = new Attachment();
    profile.url = imageUrl;
    const cover = new Attachment();
    cover.url = coverUrl;
    user.profile = profile;
    user.cover = cover;
    await this.userRepository.save(user);
    return user;
  }
}
