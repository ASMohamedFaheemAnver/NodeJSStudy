const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      req,
    };
  },
});

server.listen().then(() => {
  console.log(`Server is up and running!`);
});
