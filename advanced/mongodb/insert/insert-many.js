const getDB = require("../db/db");
const { geDB } = require("../db/db");

(async () => {
  const db = await getDB();
  const movies = await db.collection("movies").insertMany([
    {
      name: "Kathi",
      actor: "Vijay",
      age: 40
    },
    {
      name: "Vedalam",
      actor: "Ajith",
      age: 50
    }]);
  console.log(movies);
})();