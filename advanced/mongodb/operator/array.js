const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db.collection("movies").find({ genres: "Drama" }).toArray();
  console.log(movies.length);

  const movies3 = await db.collection("movies").find({ genres: ["Drama"] }).toArray();
  console.log(movies3.length);

  // $in and $nin will work with single, arrays key value as well
  const movies2 = await db.collection("movies").find({ genres: { $in: ["Drama", "Action", "Crime"] } }).toArray();
  console.log(movies2.length);

  const movies4 = await db.collection("movies").find({ genres: { $nin: ["Drama", "Action", "Crime"] } }).toArray();
  console.log(movies4.length);
})();

