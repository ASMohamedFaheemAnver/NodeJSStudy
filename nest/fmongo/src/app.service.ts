import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import {
  Profile,
  ProfileDocument,
  ProfileSchema,
} from './schemas/profile.schema';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  async create() {
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

  async session() {
    await this.userModel.deleteMany();
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      // Create user with rollback session
      const newUser = new this.userModel({ name: 'udev', age: 25 });
      await newUser.save({ session });

      // Returning null since we are committing session after find
      const userWithoutSession = await this.userModel.findOne();
      console.log({ userWithoutSession });

      // Will return created one since we are in same session
      const userWitSession = await this.userModel.findOne().session(session);
      console.log({ userWitSession });

      //  Updating user
      userWitSession.age += 1;
      await userWitSession.save({ session });

      // Find update user
      // Even if we got element it won't be updated one, since this query can be happen in multiple replicas
      const findUpdatedUserWithoutSession = await this.userModel.findById(
        userWitSession.id,
      );
      console.log({ findUpdatedUserWithoutSession });

      // Find update user with session
      const findUpdatedUserWithSession = await this.userModel
        .findById(userWitSession.id)
        .session(session);
      console.log({ findUpdatedUserWithSession });
      await session.commitTransaction();
      session.endSession();
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      throw e;
    }
  }

  async populate() {
    // Cleanup and relationship creation
    await this.userModel.deleteMany();
    await this.profileModel.deleteMany();
    // User 1
    const newProfile1 = new this.profileModel({ points: 100 });
    await newProfile1.save();
    const newUser1 = new this.userModel({
      name: 'udev',
      age: 25,
    });
    // Testing reference assign
    newUser1.profile = new Types.ObjectId(newProfile1._id);
    await newUser1.save();
    // User 2
    const newProfile2 = new this.profileModel({ points: 200 });
    await newProfile2.save();
    const newUser2 = new this.userModel({
      name: 'na',
      age: 24,
    });
    newUser2.profile = newProfile2._id;
    await newUser2.save();
    // End of data creation

    // Find user with points above 150
    const filteredUsers = await this.userModel.aggregate([
      {
        $lookup: {
          from: this.profileModel.collection.name,
          localField: 'profile',
          foreignField: '_id',
          as: 'profile',
        },
      },
      // {
      // https://stackoverflow.com/questions/16448175/whats-the-unwind-operator-in-mongodb
      // This will spread array and create multiple rows/collections if profile is an array
      //   $unwind: '$profile',
      // },
      {
        $match: {
          'profile.points': { $gt: 150 },
        },
      },
    ]);
    console.log({ filteredUsers });
  }
}
