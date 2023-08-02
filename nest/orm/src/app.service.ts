import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { Comment } from './comment.entity';
import { UserWithComments } from './user-with-comment';
import { User } from './user.entity';
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

  async getUserWithFavoriteUsers() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favorites', 'favorites')
      .getMany();
    return users;
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
    const qb = this.getUserQueryBuilder();
    this.leftJoinUserProfile(qb);
    this.leftJoinUserCover(qb);
    const results = await qb.getMany();
    return results;
  }

  getUserQueryBuilder() {
    return this.userRepository.createQueryBuilder('user');
  }

  leftJoinUserProfile(qb: SelectQueryBuilder<User>) {
    return qb.leftJoinAndSelect('user.profile', 'profile');
  }
  leftJoinUserCover(qb: SelectQueryBuilder<User>) {
    return qb.leftJoinAndSelect('user.cover', 'cover');
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
    boolean: boolean,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['comments', 'profile', 'cover'],
    });
    user.name = name;
    // Always it will be update and boolean = true
    if (boolean) {
      const profile = new Attachment();
      profile.url = imageUrl;
      user.profile = profile;
    } else {
      user.profile.url = imageUrl;
    }
    if (boolean) {
      const cover = new Attachment();
      cover.url = coverUrl;
      user.cover = cover;
    } else {
      user.cover.url = coverUrl;
    }
    await this.userRepository.save(user);
    return user;
  }
}
