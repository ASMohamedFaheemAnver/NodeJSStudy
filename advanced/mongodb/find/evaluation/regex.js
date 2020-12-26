const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db.collection("movies").find({ summary: { $regex: /musical/ } }).toArray();
  console.log(movies);
})();