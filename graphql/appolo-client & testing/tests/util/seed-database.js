import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

const userOne = {
  input: {
    name: "FreeDoM",
    email: "faheem065@gmail.com",
    password: bcrypt.hashSync("password"),
  },
  user: undefined,
  jwt: undefined,
};

const seedDatabase = async () => {
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.deleteManyPosts();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  await prisma.mutation.createPost({
    data: {
      title: "Post1",
      body: "Body1",
      published: true,
      author: {
        connect: {
          id: userOne.user.id,
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
          id: userOne.user.id,
        },
      },
    },
  });
};

export { seedDatabase as default, userOne };
