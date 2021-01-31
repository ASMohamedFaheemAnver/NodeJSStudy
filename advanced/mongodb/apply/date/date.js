const getDB = require("../../db/db");

const getTotalDaysInAnYear = (year) => {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
};

(async () => {
  const db = await getDB("view-counter");

  const data = await db
    .collection("users")
    .aggregate([
      {
        $project: {
          views: 1,
          dayDif: { $divide: [{ $subtract: ["$$NOW", "$views.day.now"] }, 60 * 60 * 1000 * 24] },
          monthDif: {
            $divide: [
              { $subtract: ["$$NOW", "$views.month.now"] },
              60 * 60 * 1000 * 24 * new Date().getDate(),
            ],
          },
          yearDif: {
            $divide: [
              { $subtract: ["$$NOW", "$views.year.now"] },
              60 * 60 * 1000 * 24 * getTotalDaysInAnYear(new Date().getFullYear),
            ],
          },
        },
      },
    ])
    .toArray();
  console.log(data[0]);
})();
