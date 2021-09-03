const mongoose = require("mongoose");

const getConnections = async () => {
  const connections = [
    await mongoose.createConnection(process.env.MONGODB_URL_FROM, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    await mongoose.createConnection(process.env.MONGODB_URL_TO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
  ];
  return connections;
};

module.exports = getConnections;
