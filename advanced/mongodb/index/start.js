const getDB = require("../db/db");

(async () => {
  const db = await getDB("playground");
  const movies = await db
    .collection("contacts")
    .find({ "dob.age": { $gt: 60 } })
    .explain("executionStates");
  console.log(movies);

  // const result = await db.collection("contacts").createIndex({ "dob.age": 1 });
  // console.log(result);
})();
