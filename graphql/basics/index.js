import { GraphQLServer } from "graphql-yoga";

// Type definitions { schema }
const typeDefs = `
    type Query{
        me: User!
        post: Post!
        greeting(name: String!): String!
        add(a: Float!, b: Float!): Float!
    }

    type User{
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post{
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    me: () => {
      return {
        id: "123098",
        name: "Freedom",
        email: "jstrfaheem065@gmail.com",
        age: 20,
      };
    },

    post: () => {
      return {
        id: "12",
        title: "GrqphQL tutorial",
        body: "This is a body telling about post",
        published: false,
      };
    },

    greeting: (parent, args, ctx, info) => {
      return `Hello my friend ${args.name}`;
    },

    add: (parent, { a, b }, ctx, info) => {
      return a + b;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running on localhost:4000");
});
