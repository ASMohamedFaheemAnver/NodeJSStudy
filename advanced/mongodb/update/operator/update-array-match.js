const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateMany(
    {
      hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } },
    },
    // This will update only first element of the array
    { $set: { "hobbies.$.highFrequency": true } }
  );
  console.log(actor);
})();
