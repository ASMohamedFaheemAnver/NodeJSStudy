const getDB = require("../../db/db");
const fs = require("fs");

const getTotalDaysInAnYear = (year) => {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
};

(async () => {
  const db = await getDB("view-counter");
  const data = await db.collection("users").findOne();
  fs.writeFile("backup.json", JSON.stringify(data), (err) => {
    if (err) console.error(err);
  });
})();
