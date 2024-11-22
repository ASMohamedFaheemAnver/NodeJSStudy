import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Creating initial users
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
      articlesCount: 2,
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
