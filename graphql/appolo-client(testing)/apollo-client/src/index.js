import ApolloBoost, { gql } from "apollo-boost";

const client = new ApolloBoost({
  uri: "http://localhost:4000/",
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

client
  .query({
    query: getUsers,
  })
  .then((res) => {
    console.log({ emittedUsers: res.data });
    let html = ``;
    res.data.users.forEach((user) => {
      html += `<div>
        <h3>${user.id} + ${user.name}</h3>
      </div>`;
    });
    document.getElementById("posts").innerHTML = html;
  });

const getPosts = gql`
  query {
    posts {
      id
      title
    }
  }
`;

client
  .query({
    query: getPosts,
  })
  .then((res) => {
    console.log({ emittedPosts: res.data });

    let html = ``;
    res.data.posts.forEach((post) => {
      html += `<div>
        <h3>${post.id} + ${post.title}</h3>
      </div>`;
    });
    document.getElementById("users").innerHTML = html;
  });
