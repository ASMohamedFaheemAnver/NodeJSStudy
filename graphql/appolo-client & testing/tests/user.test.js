import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
import prisma from "../src/prisma";
import seedDatabase from "./util/seed-database";
import getClient from "./util/get-client";

const client = getClient();

beforeEach(seedDatabase);

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

test("Shouldn't login with bad credentials.", async () => {
  const login = gql`
    mutation {
      login(data: { email: "faheem065@gmail.com", password: "wrong" }) {
        token
      }
    }
  `;

  await expect(client.mutate({ mutation: login })).rejects.toThrow();
});

test("Shouldn't create user with short password.", async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Freedom"
          email: "jstrfaheem065@gmail.com"
          password: "short"
        }
      ) {
        token
        user {
          id
        }
      }
    }
  `;

  expect(client.mutate({ mutation: createUser })).rejects.toThrow();
});
