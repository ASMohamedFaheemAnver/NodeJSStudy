const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function getDB() {
  try {
    await client.connect();
    const db = client.db("playground");
    return db;
  } catch (err) {
    throw err;
  }
}

module.exports = getDB;