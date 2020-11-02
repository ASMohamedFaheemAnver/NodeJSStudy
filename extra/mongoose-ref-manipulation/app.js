const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");

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

app.use("/user", userRoutes);

mongoose
  .connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log("Connected to database.");
    app.listen(8080, () => {
      console.log("Server is running on localhost:" + 8080);
    });
  });
