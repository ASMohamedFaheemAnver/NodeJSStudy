const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db
    .collection("actors")
    .updateMany({}, { $inc: { "hobbies.$[].frequency": 1 } });
  // console.log(actor);
  const actor2 = await db
    .collection("actors")
    .updateMany({}, { $set: { "hobbies.$[].testing": true } });
})();
