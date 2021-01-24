const express = require("express");
const redis = require("async-redis");
const fetch = require("node-fetch");

const routes = express.Router();

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

routes.use("/posts", async (req, res, next) => {
  let posts = JSON.parse(await client.get("posts"));
  if (!posts) {
    posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts = await posts.json();
    client.set("posts", JSON.stringify(posts));
  }
  return res.json(posts);
});

module.exports = routes;
