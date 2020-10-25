import bcrypt from "bcryptjs";
import prisma from "../../src/prisma";

const seedDatabase = async () => {
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
};

export { seedDatabase as default };
