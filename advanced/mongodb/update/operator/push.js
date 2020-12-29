const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateOne(
    {
      name: "Chris",
    },
    {
      $push: {
        hobbies: {
          $each: [
            { title: "Good wine", frequency: 8 },
            { title: "Hiking", frequency: 2 },
          ],
          $sort: { frequency: -1 },
          // $slice: 2 will only push 2 element no matter how many item's we have
          // $slice: 2,
        },
      },
    }
  );
  console.log(actor);
})();
