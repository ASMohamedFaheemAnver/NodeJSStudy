const getDB = require("../db/db");

(async () => {
  const db = await getDB("movie-datas");
  const movie = await db
    .collection("movies")
    .findOne({ "network.country.name": "United States" });
  // console.log(movie);

  const movies2 = await db
    .collection("movies")
    .find({ genres: { $size: 2 } })
    .toArray();
  // console.log(movies2.length);

  const movies3 = await db
    .collection("movies")
    .find({ genres: { $all: ["Crime", "Action", "Drama"] } })
    .toArray();
  // console.log(movies3.length);

  const movies4 = await db
    .collection("actors")
    .find({
      hobbies: { $elemMatch: { title: "Sports", frequency: { $gt: 2 } } },
    })
    .toArray();
  console.log(movies4.length);
})();
