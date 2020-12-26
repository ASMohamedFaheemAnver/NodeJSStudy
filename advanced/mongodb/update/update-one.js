const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateOne(
    {
      name: "Chris",
    },
    {
      $set: {
        hobbies: [
          { title: "Sports", frequency: 5 },
          { title: "Cooking", frequency: 3 },
        ],
      },
      $inc: {
        age: 10,
      },
    }
  );
  console.log(actor);
})();
