import { Module } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User, UserSchema } from "./schemas/user.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Connection } from "mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // MongooseModule.forRoot("mongodb://localhost/playground"),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      connectionName: "user",
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>("USER_MONGODB_URI"),
        };
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      connectionName: "root",
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>("ROOT_MONGODB_URI"),
        };
      },
    }),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      "user"
    ),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      "root"
    ),
  ],
  controllers: [AppController],
  // providers: [
  //   {
  //     provide: AppService,
  //     useFactory: (rootConnection: Connection) => {
  //       return new AppService(rootConnection);
  //     },
  //     inject: [getConnectionToken("user")],
  //   },
  // ],
  providers: [AppService],
})
export class AppModule {}
