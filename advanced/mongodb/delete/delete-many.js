const getDB = require("../db/db");
const { geDB } = require("../db/db");

(async () => {
  const db = await getDB();
  const movies = await db.collection("movies").deleteMany({ actor: "Ajith" });
  console.log(movies);
})();