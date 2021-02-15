const axios = require("axios");
const fs = require("fs");

(async () => {
  const catagory = ["noob", "concurrency"];
  catagory.forEach(async (point) => {
    const res = await axios.get("http://localhost:3000/create");
    console.log({ message: "starting", data: res.data });
    const hitPoint = `http://localhost:3000/${point}?_id=${res.data.doc._id}`;
    console.log({ message: "hit point", url: hitPoint });
    const promises = [];
    for (let i = 0; i < 5000; i++) {
      promises.push(axios.get(hitPoint));
    }
    Promise.all(promises)
      .then((results) => {
        let count = 0;
        results.forEach((res) => {
          count++;
        });
        const getPoint = `http://localhost:3000/get?_id=${res.data.doc._id}`;
        axios.get(getPoint).then((res) => {
          fs.writeFile(`${point}.json`, JSON.stringify(res.data), () => {
            console.log({ message: "finished", count: count });
          });
        });
      })
      .catch((err) => {
        console.log({ message: "an error occured", error: err });
      });
  });
})();
