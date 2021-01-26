const getDB = require("../db/db");
const fs = require("fs");

(async () => {
  const db = await getDB("playground");
  const places = await db.collection("places").find({}).toArray();

  fs.writeFile("coordinates.json", JSON.stringify(places), (err) => {
    if (err) console.error(err);
  });
})();
