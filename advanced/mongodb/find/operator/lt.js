const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db.collection("movies").find({ runtime: { $lt: 40 } }).toArray();
  console.log(movies);
})();