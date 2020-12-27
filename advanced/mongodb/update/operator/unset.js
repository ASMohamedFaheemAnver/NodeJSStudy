const getDB = require("../../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const actor = await db.collection("actors").updateMany(
    {
      isSporty: true,
    },
    {
      // phone: {value}, value can be very 1 or ''
      $unset: {
        phone: 1,
      },
    }
  );
  console.log(actor);
})();
