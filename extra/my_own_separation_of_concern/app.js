const express = require("express");
const ip = require("ip");
const graphqlHttp = require("express-graphql");
const app = express();
const graphqlSchema = require("./graphql/schema");
// const graphqlResolver = require("./graphql/resolver");

// app.use(
//   "/graphql",
//   graphqlHttp({
//     schema: graphqlSchema,
//     rootValue: graphqlResolver,
//     graphiql: true,
//   })
// );

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on " + ip.address() + ":3000");
});
