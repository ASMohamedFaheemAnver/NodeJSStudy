const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;
const client = new MongoClient(
  "mongodb+srv://rifa_flover:Ty4wzRMLVJqhP18F@node-zvzjs.mongodb.net/shop?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

const mongoConnect = cb => {
  client
    .connect()
    .then(client => {
      _db = client.db();
      // console.log("Connected!");
      // cb(client);
      cb();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "NO DATABASE FOUND!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
