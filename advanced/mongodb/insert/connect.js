const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const db = client.db("playground");
    const collection = db.collection("movies");

    const movie = await collection.insertOne({ name: "Kathi", actor: "Vija" });

    const movies = await collection.find().toArray();

    console.log(movies);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();