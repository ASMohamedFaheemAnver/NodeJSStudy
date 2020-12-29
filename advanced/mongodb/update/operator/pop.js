const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateOne(
    {
      name: "Chris",
    },
    {
      $pop: {
        // hobbies: -1 will pop first element, 1 will pop last element
        hobbies: 1,
      },
    }
  );
  console.log(actor);
})();
