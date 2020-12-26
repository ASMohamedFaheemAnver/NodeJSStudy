const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db.collection("movies").find({ runtime: { $ne: 60 } }).toArray();
  console.log(movies);
})();