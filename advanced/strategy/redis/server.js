const express = require("express");

const routes = require("./routes");

const app = express();

app.use("/", routes);
app.listen(process.env.PORT || 3000, () => {
  console.log(`server is up and runing.`);
});
