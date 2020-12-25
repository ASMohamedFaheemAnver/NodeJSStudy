const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db
    .collection("movies")
    .find()
    .sort({ "rating.average": -1, runtime: -1 })
    .skip(100)
    .limit(10)
    .toArray();
  console.log(movies.length);
  console.log(movies[0]);
})();
