const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = process.env.public_key;
const privateVapiKey = process.env.private_key;

webPush.setVapidDetails("mailto:jstrfaheem065@gmail.com", publicVapidKey, privateVapiKey);

app.post("/subscribe", (req, res, next) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Push testing bro!",
  });

  webPush.sendNotification(subscription, payload).catch((err) => {
    console.error(err);
  });
});

const port = 5000;

app.listen(port, () => {
  console.log("Server is up and running!");
});
