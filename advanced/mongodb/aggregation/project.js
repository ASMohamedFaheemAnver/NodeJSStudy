const getDB = require("../db/db");

(async () => {
  const db = await getDB("analytics");
  const persons = await db
    .collection("persons")
    .aggregate([
      {
        $project: {
          gender: 1,
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
