const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateOne(
    {
      name: "Chris",
    },
    {
      $pull: {
        hobbies: { title: "Good wine" },
      },
    }
  );
  console.log(actor);
})();
