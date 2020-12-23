const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db.collection("movies").find({ runtime: { $exists: false, $gt: 60 } }).toArray();
  console.log(movies.length);

  const movies2 = await db.collection("movies").find({ runtime: { $type: "number" } }).toArray();
  console.log(movies2.length);
})();