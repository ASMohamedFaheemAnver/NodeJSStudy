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

// Demo user data
const posts = [
  {
    id: "1",
    title: "intro",
    body: "",
    published: true,
    author: "1",
  },
  {
    id: "12",
    title: "intro2",
    body: "",
    published: true,
    author: "12",
  },
  {
    id: "13",
    title: "intro4",
    body: "",
    published: true,
    author: "13",
  },
];

// Demo comments
const comments = [
  {
    id: "1",
    text: "comment1",
    author: "1",
    post: "1",
  },
  {
    id: "12",
    text: "comment12",
    author: "12",
    post: "1",
  },
  {
    id: "13",
    text: "comment13",
    author: "13",
    post: "1",
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
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Mutation{
      createUser(name: String!, email: String!, age: Int): User!
    }

    type User{
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]! 
      comments: [Comment!]!
    }

    type Post{
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }

    type Comment{
      id: ID!
      text: String!
      author: User!
      post: Post!
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
    posts: (parent, args, ctx, info) => {
      return posts;
    },
    comments: (parent, args, ctx, info) => {
      return comments;
    },
  },

  Mutation: {
    createUser: (parent, args, ctx, info) => {
      const emailTaken = users.some((user) => {
        return user.email === args.email;
      });

      if (emailTaken) {
        throw new Error("Email taken!");
      }

      const user = {
        id: new Date().getTime(),
        name: args.email,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
    },
  },

  Post: {
    author: (parent, args, ctx, info) => {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments: (parent, args, ctx, info) => {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },

  User: {
    posts: (parent, args, ctx, info) => {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments: (parent, args, ctx, info) => {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author: (parent, args, ctx, info) => {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post: (parent, args, ctx, info) => {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running on localhost:4000");
});
