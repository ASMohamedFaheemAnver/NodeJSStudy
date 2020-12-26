const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db.collection("movies").find({ $or: [{ "rating.average": { $lt: 6 } }, { "rating.average": { $gt: 9 } }] }).toArray();
  console.log(movies.length);

  const movies2 = await db.collection("movies").find({ $nor: [{ "rating.average": { $lt: 6 } }, { "rating.average": { $gt: 9 } }] }).toArray();
  console.log(movies2.length);

  const movies3 = await db.collection("movies").find({ $and: [{ "rating.average": { $gt: 6 } }, { "rating.average": { $lt: 10 } }] }).toArray();
  console.log(movies3.length);

  // This will work but same key "rating.average" will override the first query so it's safer to use $and operator
  const movies4 = await db.collection("movies").find({ "rating.average": { $gt: 6 } }, { "rating.average": { $lt: 10 } }).toArray();
  console.log(movies4.length);


  const movies5 = await db.collection("movies").find({ runtime: { $not: { $eq: 60 } } }).toArray();
  console.log(movies5.length);
})();