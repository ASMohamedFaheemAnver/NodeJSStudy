import { GraphQLServer } from "graphql-yoga";

// Demo user data
let users = [
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
let posts = [
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
let comments = [
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
      createUser(data: CreateUserInput!): User!
      deleteUser(id: ID!): User!
      createPost(data: CreatePostInput!): Post!
      deletePost(id: ID!): Post!
      createComment(data: CreateCommentInput!): Comment!
      deleteComment(id: ID!): Comment!
    }

    input CreateUserInput{
      name: String!
      email: String! 
      age: Int
    }

    input CreatePostInput{
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input CreateCommentInput{
      text: String! 
      author: String!
      post: String!
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
        return user.email === args.data.email;
      });

      if (emailTaken) {
        throw new Error("Email taken!");
      }

      const user = {
        id: new Date().getTime(),
        ...args.data,
      };

      users.push(user);

      return user;
    },

    deleteUser: (parent, args, ctx, info) => {
      const userIndex = users.findIndex((user) => {
        return user.id === args.id;
      });

      if (userIndex === -1) {
        throw new Error("User not found!");
      }

      const deletedUser = users.splice(userIndex, 1)[0];

      posts = posts.filter((post) => {
        const match = post.author === deletedUser.id;
        console.log(match);
        if (match) {
          comments = comments.filter((comment) => {
            return comment.author !== deletedUser.id;
          });
        }

        return !match;
      });

      return deletedUser;
    },

    createPost: (parent, args, ctx, info) => {
      const userExist = users.some((user) => {
        return user.id === args.data.author;
      });

      if (!userExist) {
        throw new Error("User doesn't exist!");
      }

      const post = {
        id: new Date().getTime(),
        ...args.data,
      };

      posts.push(post);
      return post;
    },

    deletePost: (parent, args, ctx, info) => {
      const postExist = posts.find((post) => {
        return post.id === args.id;
      });

      if (!postExist) {
        throw new Error("Post doesn't exist!");
      }

      posts = posts.filter((post) => {
        return post.id !== args.id;
      });

      comments = comments.filter((comment) => {
        return comment.post === postExist.id;
      });

      return postExist;
    },

    createComment: (parent, args, ctx, info) => {
      const userExist = users.some((user) => {
        return user.id === args.data.author;
      });

      if (!userExist) {
        throw new Error("User doesn't exist!");
      }

      const postExistAndPublished = posts.some((cpost) => {
        return cpost.published && cpost.id === args.data.post;
      });

      if (!postExistAndPublished) {
        throw new Error("Post doesn't exist or published!");
      }

      const comment = {
        id: new Date().getTime(),
        ...args.data,
      };

      comments.push(comment);
      return comment;
    },

    deleteComment: (parent, args, ctx, info) => {
      const deletedComment = comments.find((comment) => {
        return comment.id === args.id;
      });

      if (!deletedComment) {
        throw new Error("Comment doesn't exist!");
      }

      comments = comments.filter((comment) => {
        return comment.id !== args.id;
      });

      return deletedComment;
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
