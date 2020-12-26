const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movies = await db
    .collection("movies")
    .find({ $expr: { $gt: ["$id", "$runtime"] } })
    .toArray();
  console.log(movies.length);

  const movies2 = await db
    .collection("movies")
    .find({
      $expr: {
        $gt: [
          {
            $cond: {
              if: { $gte: ["$id", 60] },
              then: { $subtract: ["$id", 10] },
              else: "$volume",
            },
          },
          "$runtime",
        ],
      },
    })
    .toArray();
  console.log(movies2.length);
})();
