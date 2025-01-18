import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        username: "Andre",
        email: "Noviço@gmail.com",
        password: "123456",
        id: 1,
      },
      {
        username: "Babakca",
        email: "diudiu@gmail.com",
        password: "76584",
        id: 2,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.todo.createMany({
    data: [
      {
        id: 1,
        userId: 1,
        title: "chavoso",
        description: "chavear las novinhas",
        dueDate: new Date(),
        status: "PENDING",
      },
      {
        id: 2,
        userId: 2,
        title: "beber",
        description: "pegar um corotin",
        dueDate: new Date(),
        status: "PENDING",
      },
    ],
    skipDuplicates: true,
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
