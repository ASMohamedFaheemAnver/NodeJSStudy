const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");

const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorizaition");
  next();
});

// app.use(bodyParser.urlencoded()); // x-www.form-urlencoded
app.use(bodyParser.json()); // application/json

app.use("/feed", feedRoutes);

mongoose
  .connect("mongodb://localhost:27017/messages", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(_ => {
    app.listen(8080, () => {
      console.log("Server is running on localhost:" + 8080);
    });
  })
  .catch(err => {
    console.log(err);
  });
