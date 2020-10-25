import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
import seedDatabase, { userOne } from "./util/seed-database";
import getClient from "./util/get-client";

const client = getClient();

beforeEach(seedDatabase);

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

test("Should return all own posts.", async () => {
  const client = getClient(userOne.jwt);

  const getMyPosts = gql`
    query {
      myPosts {
        id
        title
        body
        published
      }
    }
  `;

  const { data } = await client.query({ query: getMyPosts });
  expect(data.myPosts.length).toBe(2);
});
