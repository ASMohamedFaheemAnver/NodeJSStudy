const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const mongoose = require("mongoose");

const path = require("path");

const multer = require("multer");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "|" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorizaition");
  next();
});

// app.use(bodyParser.urlencoded()); // x-www.form-urlencoded
app.use(bodyParser.json()); // application/json

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const messages = error.messages;
  const data = error.data;
  res.status(status).json({ messages: messages, data: data });
});

mongoose
  .connect("mongodb://localhost:27017/messages", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(_ => {
    const server = app.listen(8080, () => {
      console.log("Server is running on localhost:" + 8080);
    });
    const io = require("socket.io")(server);
    io.on("connection", socket => {
      console.log("Client connected!");
    });
  })
  .catch(err => {
    console.log(err);
  });
