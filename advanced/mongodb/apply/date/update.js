const getDB = require("../../db/db");

(async () => {
  const db = await getDB("view-counter");
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const month = new Date();
  month.setHours(0, 0, 0, 0);
  month.setDate(1);

  const year = new Date();
  year.setHours(0, 0, 0, 0);
  year.setDate(1);
  year.setMonth(0);

  let data = await db
    .collection("users")
    .updateOne(
      { user: "asmohamedfaheemanver", "views.day.now": { $eq: now } },
      { $inc: { "views.day.count": 1 } }
    );
  let mData = await db
    .collection("users")
    .updateOne(
      { user: "asmohamedfaheemanver", "views.month.now": { $eq: month } },
      { $inc: { "views.month.count": 1 } }
    );

  let mYear = await db
    .collection("users")
    .updateOne(
      { user: "asmohamedfaheemanver", "views.year.now": { $eq: year } },
      { $inc: { "views.year.count": 1 } }
    );

  let total = await db
    .collection("users")
    .updateOne(
      { user: "asmohamedfaheemanver" },
      { $inc: { "views.total.count": 1 }, $set: { "views.total.to": new Date() } }
    );

  console.log({ normal: data.result, type: "date" });
  console.log({ normal: mData.result, type: "month" });
  console.log({ normal: mYear.result, type: "year" });

  if (!data.result.n) {
    data = await db
      .collection("users")
      .updateOne(
        { user: "asmohamedfaheemanver" },
        { $set: { "views.day.count": 1, "views.day.now": now } }
      );
    console.log({ change: data.result, type: "date" });
    // Checking whether concurrent access modified it or not
    if (!data.result.nModified) {
      data = await db
        .collection("users")
        .updateOne(
          { user: "asmohamedfaheemanver", "views.day.now": { $eq: now } },
          { $inc: { "views.day.count": 1 } }
        );
      console.log({ concurrent: data.result, type: "date" });
    }
  }

  if (!mData.result.n) {
    mData = await db
      .collection("users")
      .updateOne(
        { user: "asmohamedfaheemanver" },
        { $set: { "views.month.count": 1, "views.month.now": month } }
      );
    console.log({ change: mData.result, type: "month" });
    // Checking whether concurrent access modified it or not
    if (!mData.result.nModified) {
      mData = await db
        .collection("users")
        .updateOne(
          { user: "asmohamedfaheemanver", "views.month.now": { $eq: month } },
          { $inc: { "views.month.count": 1 } }
        );
      console.log({ concurrent: mData.result, type: "month" });
    }
  }

  if (!mYear.result.n) {
    mYear = await db
      .collection("users")
      .updateOne(
        { user: "asmohamedfaheemanver" },
        { $set: { "views.year.count": 1, "views.year.now": year } }
      );
    console.log({ change: mYear.result, type: "year" });
    // Checking whether concurrent access modified it or not
    if (!mYear.result.nModified) {
      mYear = await db
        .collection("users")
        .updateOne(
          { user: "asmohamedfaheemanver", "views.year.now": { $eq: year } },
          { $inc: { "views.year.count": 1 } }
        );
      console.log({ concurrent: mYear.result, type: "year" });
    }
  }

  console.log({ message: "200 OK!" });
})();
