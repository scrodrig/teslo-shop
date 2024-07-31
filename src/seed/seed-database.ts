import { initialData } from "./seed";
import prisma from "../lib/prisma";
// import prims

async function main() {
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);
  
  console.log("Seed executed...", process.env.NODE_ENV);
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
