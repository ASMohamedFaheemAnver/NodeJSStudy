const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateMany(
    {},
    {
      $rename: {
        age: "totalAge",
      },
    }
  );
  console.log(actor);
})();
