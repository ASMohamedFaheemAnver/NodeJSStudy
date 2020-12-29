const getDB = require("../db/db");

(async () => {
  const db = await getDB("analytics");
  const persons = await db
    .collection("persons")
    .aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          location: {
            type: "Point",
            coordinates: [
              {
                $convert: {
                  input: "$location.coordinates.longitude",
                  to: "double",
                  onError: 0.0,
                  onNull: 0.0,
                },
              },
              {
                $convert: {
                  input: "$location.coordinates.latitude",
                  to: "double",
                  onError: 0.0,
                  onNull: 0.0,
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          gender: 1,
          email: 1,
          location: 1,
          full_name: {
            $concat: [
              { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
              { $substrCP: ["$name.first", 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] }] },
              " ",
              { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
              { $substrCP: ["$name.last", 1, { $subtract: [{ $strLenCP: "$name.last" }, 1] }] },
            ],
          },
        },
      },
    ])
    .toArray();
  console.log(persons);
})();
