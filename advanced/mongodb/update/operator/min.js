const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateOne(
    {
      name: "Chris",
    },
    {
      // Will modify age if the existing value greater than 35
      $min: {
        age: 35,
      },
    }
  );
  console.log(actor);
})();
