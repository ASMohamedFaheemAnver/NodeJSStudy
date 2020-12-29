const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateOne(
    {
      name: "Chris",
    },
    {
      // $addToSet just like $push but won't allow duplicates
      $addToSet: {
        hobbies: {
          title: "Good wine",
          frequency: 8,
        },
      },
    }
  );
  console.log(actor);
})();
