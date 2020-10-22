import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "./generated/prisma.graphql",
  endpoint: "http://localhost:4466/",
});

const getUsers = async () => {
  const users = prisma.query.users(
    null,
    `{ id name email posts { id title body } }`
  );

  return users;
};

const createUser = async (name, email) => {
  const user = await prisma.mutation.createUser(
    {
      data: { name, email },
    },
    `{ id name email }`
  );
  return user;
};

const createPostForUser = async (author_id, data) => {
  const userExist = await prisma.exists.User({ id: author_id });

  if (!userExist) {
    throw new Error("User not found!");
  }

  const post = await prisma.mutation.createPost(
    {
      data: { ...data, author: { connect: { id: author_id } } },
    },
    `{ author { id name email posts { id title published } } }`
  );

  return post.author;
};

const updatePostForUser = async (post_id, data) => {
  const postExist = await prisma.exists.Post({ id: post_id });

  if (!postExist) {
    throw new Error("Post not found!");
  }

  const post = await prisma.mutation.updatePost(
    {
      where: { id: post_id },
      data: { ...data },
    },
    `{ author { id name email posts { id title published } }`
  );

  return post.author;
};
