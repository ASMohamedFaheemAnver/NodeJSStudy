import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Create a user
  // const user = await prisma.user.create({
  //   data: { email: "udev@gmail.com", name: "udev" },
  // });
  // console.log(user);
  // 2. Get all users
  // const users = await prisma.user.findMany();
  // console.log({ users });
  // 3. Create article and associate it with user
  // const user = await prisma.user.findFirst();
  // if (user) {
  //   const article = await prisma.article.create({
  //     data: {
  //       title: `article${(Math.random() * 1000).toFixed(0)}`,
  //       body: `body${(Math.random() * 1000).toFixed(0)}`,
  //       /*authorId: user.id,*/ author: { connect: { id: user.id } },
  //     },
  //   });
  //   console.log(article);
  // }
  // 4. Get all articles with user
  // const articles = await prisma.user.findMany({ include: { Articles: true } });
  // console.log(articles);

  // 5. Create user and article and associate them
  const user = await prisma.user.create({
    data: {
      name: `name${(Math.random() * 1000).toFixed(0)}`,
      email: `email${(Math.random() * 1000).toFixed(0)}`,
      Articles: {
        create: [
          {
            title: `title${(Math.random() * 1000).toFixed(0)}`,
            body: `body${(Math.random() * 1000).toFixed(0)}`,
          },
          {
            title: `title${(Math.random() * 1000).toFixed(0)}`,
            body: `body${(Math.random() * 1000).toFixed(0)}`,
          },
        ],
      },
    },
  });
  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
