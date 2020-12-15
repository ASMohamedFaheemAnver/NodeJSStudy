const getDB = require("../db/db");
const { geDB } = require("../db/db");

(async () => {
  const db = await getDB();
  const movies = await db.collection("movies").insertMany([{
    name: "Kathi", actor: "Vijay"
  }, {
    name: "Vidalam",
    actor: "Ajith"
  }]);
  console.log(movies);
})();