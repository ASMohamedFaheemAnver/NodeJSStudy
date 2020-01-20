const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const client = new MongoClient(
  "mongodb+srv://rifa_flover:Ty4wzRMLVJqhP18F@node-zvzjs.mongodb.net/mean?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

const mongoConnect = cb => {
  client
    .connect()
    .then(client => {
      // console.log("Connected!");
      cb(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
