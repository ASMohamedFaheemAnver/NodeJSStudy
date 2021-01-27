const getDB = require("../db/db");

(async () => {
  const db = await getDB("playground");
  const area = await db.collection("area").insertOne({
    name: "Golden Gate Park",
    area: {
      type: "Polygon",
      coordinates: [
        [
          [-122.47979824555513, 37.77158316927621],
          [-122.4506158116466, 37.75835208766104],
          [-122.44203274293255, 37.78080959909687],
          [-122.46958439329343, 37.78426921345774],
          [-122.47979824555513, 37.77158316927621],
        ],
      ],
    },
  });
  console.log(area);
  // db.collection("area").createIndex({ area: "2dsphere" });
})();
