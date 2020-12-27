const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateOne(
    {
      name: "Chris",
    },
    {
      // Will multiply the age by 1.1
      $mul: {
        age: 1.1,
      },
    }
  );
  console.log(actor);
})();
