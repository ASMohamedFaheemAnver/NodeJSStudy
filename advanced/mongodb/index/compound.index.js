const getDB = require("../db/db");

(async () => {
  const db = await getDB("playground");

  const result = await db.collection("contacts").createIndex({ "dob.age": 1, gender: 1 });
  console.log(result);

  const res = await db
    .collection("contacts")
    .find({ "dob.age": { $gt: 35 }, gender: "male" })
    .explain("executionStates");
  console.log(res);
})();
