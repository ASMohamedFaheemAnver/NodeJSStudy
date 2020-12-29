const getDB = require("../db/db");

(async () => {
  const db = await getDB("analytics");
  const persons = await db
    .collection("persons")
    .aggregate([
      { $match: { gender: "female" } },
      { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
    ])
    .toArray();
  console.log(persons);
})();
