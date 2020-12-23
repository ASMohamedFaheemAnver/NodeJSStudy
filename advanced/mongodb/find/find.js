const getDB = require("../db/db");

(async () => {
  const db = await getDB();
  const movies = await db.collection("movies").find({ age: { $gt: 45 } }).toArray();
  console.log(movies);
})();