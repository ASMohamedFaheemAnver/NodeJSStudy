const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const update = await db.collection("actors").updateMany(
    {
      "hobbies.title": "Sports",
    },
    { $set: { isSporty: true } }
  );
  console.log(update);
})();
