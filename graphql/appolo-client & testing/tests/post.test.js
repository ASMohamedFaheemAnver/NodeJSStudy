import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
import seedDatabase from "./util/seed-database";
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
