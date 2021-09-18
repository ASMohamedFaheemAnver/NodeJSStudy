const adminMetaData = require("./model/admin");
const notificationMetaData = require("./model/notification");
const subjectMetaData = require("./model/subject");
const youtubeVideoMetaData = require("./model/youtube-video");

const migrateModel = ({ fromModel, toModel, fromCon, toCon }) => {
  const connectToDataBase = async () => {
    await fromCon;
    await toCon;
  };

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  connectToDataBase().then(async (_) => {
    const cursor = fromModel.find({}).cursor();
    let localIndex = 0;
    let cloudIndex = 0;
    while (true) {
      const res = await cursor.next();
      localIndex++;
      if (localIndex > cloudIndex + 500) {
        console.log({ msg: "Slow Downing!", localIndex, cloudIndex });
        await timer(10000);
      }
      if (!res) {
        console.log({ msg: "Migration Fully Triggered!" });
        break;
      }
      const result = new toModel(res._doc);
      result
        .save()
        .then((_) => {
          console.log({ currentMigratedIndex: cloudIndex++ });
        })
        .catch((err) => {
          console.log({ exceptionOccuredIndex: cloudIndex, err });
          process.exit(0);
        });
    }
  });
};

migrateModel({
  fromCon: adminMetaData.conOne,
  toCon: adminMetaData.conTwo,
  fromModel: adminMetaData.AdminModelOne,
  toModel: adminMetaData.AdminModelTwo,
});
migrateModel({
  fromCon: notificationMetaData.conOne,
  toCon: notificationMetaData.conTwo,
  fromModel: notificationMetaData.NotificationModelOne,
  toModel: notificationMetaData.NotificationModelTwo,
});
migrateModel({
  fromCon: subjectMetaData.conOne,
  toCon: subjectMetaData.conTwo,
  fromModel: subjectMetaData.SubjectModelOne,
  toModel: subjectMetaData.SubjectModelTwo,
});
migrateModel({
  fromCon: youtubeVideoMetaData.conOne,
  toCon: youtubeVideoMetaData.conTwo,
  fromModel: youtubeVideoMetaData.YoutubeVideoOne,
  toModel: youtubeVideoMetaData.YoutubeVideoTwo,
});
