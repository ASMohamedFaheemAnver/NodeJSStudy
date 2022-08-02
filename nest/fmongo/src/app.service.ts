import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './schemas/user.schema';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async play() {
    const newUser = new this.userModel({ name: 'udev', age: 25 });
    try {
      await newUser.save();
    } catch (e) {
      this.logger.error(e);
    }
    // const users = await this.userModel.findOne().exec();
    // console.log({ users });
    const aggregatedUsers = await this.userModel.aggregate([
      { $match: { age: { $gte: 25 } } },
    ]);
    this.logger.log({ aggregatedUsers });
  }
}
