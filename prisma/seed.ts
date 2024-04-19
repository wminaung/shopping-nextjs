import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.orderLine.deleteMany();
  await prisma.customerOrder.deleteMany();
  await prisma.order.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.categoryxproduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.category.deleteMany();
  await prisma.test.deleteMany();

  // Insert seed data
  // Products
  const product1 = await prisma.product.create({
    data: {
      title: "Product 1",
      price: 10.99,
      description: "Description for Product 1",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: "Product 2",
      price: 19.99,
      description: "Description for Product 2",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
  });

  // Categories
  const category1 = await prisma.category.create({
    data: {
      name: "Category 1",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Category 2",
    },
  });

  // Categoryxproduct
  await prisma.categoryxproduct.create({
    data: {
      categories: { connect: { id: category1.id } },
      products: { connect: { id: product1.id } },
    },
  });

  await prisma.categoryxproduct.create({
    data: {
      categories: { connect: { id: category2.id } },
      products: { connect: { id: product2.id } },
    },
  });

  // Insert more seed data for other models as needed

  console.log("Seed data inserted successfully.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
