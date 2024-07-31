import { initialData } from "./seed";
import prisma from "../lib/prisma";
// import prims

async function main() {
  //? Delete data
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  //? Add a category

  const { categories, products } = initialData;

  const categoriesData = categories.map((category) => ({ name: category }));
  
  await prisma.category.createMany({
    data: categoriesData
  });

  console.log("Seed executed...");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
