import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";

import mongoose from "mongoose";

const pubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    // Subscription,
  },
  context: {
    pubSub,
  },
});

mongoose
  .connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((_) => {
    server.start({ port: 3000 }, () => {
      console.log("Server is up and running!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
