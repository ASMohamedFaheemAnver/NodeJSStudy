const getDB = require("../db/db");

(async () => {
  const db = await getDB();
  // w: 0 will not wait for acknowledgment from server
  // j: true will make sure it's on to-do list, in that way we can make sure the operation will success even if the server go down sometimes
  // wtimeout: 200 when speed matters, we can specify waiting time
  const movie = await db.collection("movies").insertOne({ name: "Kathi with concern", actor: "Vijay" }, { writeConcern: { w: 0, j: true, wtimeout: 200 } });
  console.log(movie);
})();