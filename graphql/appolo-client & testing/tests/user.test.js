import "cross-fetch/polyfill";
import ApolloBoost, { gql } from "apollo-boost";
import bcrypt from "bcryptjs";
import prisma from "../src/prisma";

const client = new ApolloBoost({
  uri: "http://localhost:4000",
});

beforeEach(async () => {
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.createUser({
    data: {
      name: "FreeDoM",
      email: "faheem065@gmail.com",
      password: bcrypt.hashSync("password"),
    },
  });

  await prisma.mutation.createPost({
    data: {
      title: "Post1",
      body: "Body1",
      published: true,
      author: {
        connect: {
          email: "faheem065@gmail.com",
        },
      },
    },
  });

  await prisma.mutation.createPost({
    data: {
      title: "Post2",
      body: "Body2",
      published: false,
      author: {
        connect: {
          email: "faheem065@gmail.com",
        },
      },
    },
  });
});

test("Should create a new user.", async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Freedom"
          email: "jstrfaheem065@gmail.com"
          password: "password"
        }
      ) {
        token
        user {
          id
        }
      }
    }
  `;

  const response = await client.mutate({ mutation: createUser });
  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });
  expect(exists).toBe(true);
});

test("Should expose public author profiles.", async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;

  const response = await client.query({ query: getUsers });
  expect(response.data.users.length).toBe(1);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe("FreeDoM");
});

test("Should expose public posts.", async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
        author {
          id
          name
          email
        }
      }
    }
  `;

  const response = await client.query({ query: getPosts });
  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});
