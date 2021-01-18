const getDB = require("../db/db");

(async () => {
  const db = await getDB("playground");
  // const place = await db.collection("places").insertOne({
  //   name: "California Academy of Sciences",
  //   location: { type: "Point", coordinates: [-122.46606781683715, 37.76991377818879], },
  // });
  // console.log(place);

  // await db.collection("places").createIndex({ location: "2dsphere" });

  const place = await db
    .collection("places")
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [-122.4654670005253, 37.76937947592187],
          },
          $maxDistance: 80,
          // $minDistance: 10,
        },
      },
    })
    .toArray();
  console.log(place);
})();
