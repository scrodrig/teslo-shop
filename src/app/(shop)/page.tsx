import { Pagination, ProductGrid, Title } from "@/components";

import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: number;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page,
    });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
