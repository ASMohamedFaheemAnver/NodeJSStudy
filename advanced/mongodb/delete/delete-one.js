const getDB = require("../db/db");

(async () => {
  const db = await getDB();
  const movie = await db.collection("movies").deleteOne({ actor: "Vijay" });
  console.log(movie);
})();