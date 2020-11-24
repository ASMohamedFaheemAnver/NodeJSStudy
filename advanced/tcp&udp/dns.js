const dns = require("dns");

dns.lookup("pluralsight.com", (err, address) => {
  console.log(address);
});

// dns.resolve("pluralsight.com", "MX", (err, address) => {
//   console.log(address);
// });

// dns.resolveMx("pluralsight.com", (err, address) => {
//   console.log(address);
// });

dns.reverse("104.18.50.64", (err, host) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(host);
});