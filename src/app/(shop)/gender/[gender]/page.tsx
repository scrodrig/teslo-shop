export const revalidate = 60 // 1 minute

import { Pagination, ProductGrid, Title } from '@/components'

import { Gender } from '@prisma/client'
import { getPaginatedProductsWithImages } from '@/actions'
import { redirect } from 'next/navigation'

interface CategoryPageProps {
  params: {
    gender: string
  }
  searchParams: {
    page?: number
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  // if (id === "kids") {
  //   notFound();
  // }

  const { gender } = params

  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  })

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  const labels: Record<string, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'Unisex',
  }

  return (
    <>
      <Title title={`${labels[gender]} Articles`} subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
