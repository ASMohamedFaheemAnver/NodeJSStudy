const http = require("http");

const req = http.request(
  {
    hostname: "www.google.com",
    method: "GET",
  },
  // response is a readable stream
  (res) => {
    // console.log(res);

    // listenning to data emit
    res.on("data", (data) => {
      // console.log(data.toString());
    });
  }
);

// listenning to error emit
req.on("error", (e) => {
  console.error(e);
});

// global agent
// console.log(req.agent);

// ending the writable stream
req.end();
