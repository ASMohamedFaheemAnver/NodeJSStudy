const getDB = require("../db/db");

(async () => {
  const db = await getDB();
  const movies = await db
    .collection("movies")
    .find({ age: { $gt: 45 } })
    .project({ _id: 0, name: 1 })
    .toArray();
  // console.log(movies);

  const db2 = await getDB("movie-datas");
  const movies2 = await db2
    .collection("movies")
    .find({})
    .project({ name: 1, genres: 1, runtime: 1, rating: 1 })
    .toArray();
  // console.log(movies2);

  const movies3 = await db2
    .collection("movies")
    .find({ genres: "Drama" })
    // genres.$ will project one first item in that array no matter it's 'Drama' or not
    .project({ name: 1, "genres.$": 1, runtime: 1, rating: 1 })
    .toArray();
  // console.log(movies3);

  const movies4 = await db2
    .collection("movies")
    .find({ genres: "Drama" })
    .project({
      name: 1,
      // $elemMatch will return true/1 if genres has minimum 'Drama' and 'Horror'
      genres: { $elemMatch: { $eq: "Horror" } },
      runtime: 1,
      rating: 1,
    })
    .toArray();
  // console.log(movies4);

  const movies5 = await db2
    .collection("movies")
    .find({ "rating.average": { $gt: 9 } })
    // $slice: 3 will return first 3 items in that array
    // $slice: [1, 2] will skill 1 item and will return 2 item after that
    .project({ genres: { $slice: 3 }, name: 1 })
    .toArray();
  console.log(movies5);
})();
