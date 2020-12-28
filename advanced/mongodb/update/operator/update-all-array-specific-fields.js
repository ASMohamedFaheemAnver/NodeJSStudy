const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateMany(
    {
      "hobbies.frequency": { $gt: 2 },
    },
    { $set: { "hobbies.$[el].goodFrequency": true } },
    { arrayFilters: [{ "el.frequency": { $gt: 2 } }] }
  );
  console.log(actor);
})();
