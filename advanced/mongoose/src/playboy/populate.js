const mongoose = require("mongoose");
const Notification = require("../model/notification");
const { dumpJson } = require("../util/helper");

// Dynamic population with nested filtering
(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const notifications = await Notification.aggregate([
    {
      $lookup: {
        from: "youtubevideos",
        localField: "item",
        foreignField: "_id",
        as: "video",
      },
    },
    {
      $lookup: {
        from: "pdfs",
        localField: "item",
        foreignField: "_id",
        as: "pdf",
      },
    },
    // { $unwind: "$video" },
    {
      $addFields: {
        item: {
          $cond: { if: { $size: "$video" }, then: "$video", else: "$pdf" },
        },
      },
    },
    { $unwind: "$item" },
    {
      $match: {
        "item.is_removed": { $ne: false },
      },
    },
    {
      $project: {
        description: 1,
        kind: 1,
        video: { $arrayElemAt: ["$video", 0] },
        pdf: { $arrayElemAt: ["$pdf", 0] },
      },
    },
  ]);
  dumpJson(JSON.stringify(notifications));
})();
