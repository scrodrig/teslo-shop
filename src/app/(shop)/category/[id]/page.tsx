import { ProductGrid, Title } from "@/components";

import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: Category;
  };
}

const seedProducts = initialData.products;

export default function CategoryPage({ params: { id } }: CategoryPageProps) {
  // if (id === "kids") {
  //   notFound();
  // }

  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "Men",
    women: "Women",
    kid: "Kids",
    unisex: "Unisex",
  };

  return (
    <>
      <Title
        title={`${labels[id]} Articles`}
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
