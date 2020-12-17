const getDB = require("../db/db");
const { geDB } = require("../db/db");

(async () => {
  const db = await getDB();
  const movies = await db.collection("movies").find({ age: { $gt: 45 } }).project({ _id: 0, name: 1 }).toArray();
  console.log(movies);
})();