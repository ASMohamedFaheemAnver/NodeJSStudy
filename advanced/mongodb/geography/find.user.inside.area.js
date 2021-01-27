const getDB = require("../db/db");

(async () => {
  const db = await getDB("playground");
  const res = await db
    .collection("area")
    .find({
      area: {
        $geoIntersects: {
          // $geometry: { type: "Point", coordinates: [-122.46471906934204, 37.772056916084075] },
          $geometry: { type: "Point", coordinates: [-122.48317, 37.77311] },
        },
      },
    })
    .toArray();
  console.log(res);
})();
