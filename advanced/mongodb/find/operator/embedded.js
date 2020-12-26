const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db.collection("movies").find({ "rating.average": { $gt: 9 } }).toArray();
  console.log(movies);
})();