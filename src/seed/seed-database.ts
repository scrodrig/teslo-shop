import { initialData } from "./seed";
import prisma from "../lib/prisma";
// import prims

async function main() {
  //? Delete data
  // await Promise.all([
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  // ]);

  //? Add a category

  const { categories, products, users } = initialData;

  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDb = await prisma.category.findMany();

  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);


  products.forEach(async (product) => {
    const { images, type, ...productData } = product;
    const productDb = await prisma.product.create({
      data: {
        ...productData,
        categoryId: categoriesMap[type.toLowerCase()],
      },
    });
    //? Add image
    const imagesData = images.map((image) => ({
      url: image,
      productId: productDb.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
  
  console.log("Seed executed...");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
