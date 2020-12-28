const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateOne(
    {
      name: "Maria",
    },
    {
      $set: {
        age: 29,
        hobbies: [{ title: "Good food", frequency: 3 }],
        isSporty: true,
      },
    },
    {
      // If the document doesn't exist, It will create it
      upsert: true,
    }
  );
  console.log(actor);
})();
