import { GraphQLServer } from "graphql-yoga";

// Demo user data
const users = [
  {
    id: "1",
    name: "freedom",
    email: "jstrfaheem065@gmail.com",
    age: 23,
  },
  {
    id: "12",
    name: "freedom2",
    email: "jstrfaheem065@gmail.com",
    age: 23,
  },
  {
    id: "13",
    name: "freedom3",
    email: "jstrfaheem065@gmail.com",
    age: 23,
  },
];

// Type definitions { schema }
const typeDefs = `
    type Query{
        me: User!
        post: Post!
        greeting(name: String!): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        users: [User!]!
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

    add: (parent, { numbers }, ctx, info) => {
      return numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    grades: (parent, args, ctx, info) => {
      return [99, 80, 93];
    },
    users: (parent, args, ctx, info) => {
      return users;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running on localhost:4000");
});
