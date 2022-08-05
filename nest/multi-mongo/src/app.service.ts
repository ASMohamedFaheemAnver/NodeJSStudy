import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private userModel: Model<UserDocument>;
  constructor(@InjectConnection("root") private userConnection: Connection) {
    this.userModel = userConnection.model(User.name);
  }

  async play() {
    const newUser = new this.userModel({ name: "udev", age: 25 });
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
