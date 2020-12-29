const getDB = require("../db/db");

(async () => {
  const db = await getDB("analytics");
  const persons = await db
    .collection("persons")
    .aggregate([{ $match: { gender: "female" } }])
    .toArray();
  console.log(persons);
})();
