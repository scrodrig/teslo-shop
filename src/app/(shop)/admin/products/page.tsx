// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, ProductImage, Title } from '@/components'
import { getOrderByUserId, getPaginatedOrders, getPaginatedProductsWithImages } from '@/actions'

import { Gender } from '@prisma/client'
import Image from 'next/image'
import { IoCardOutline } from 'react-icons/io5'
import Link from 'next/link'
import { currencyFormater } from '@/utils'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    page?: number
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
  })


  return (
    <>
      <Title title="Products management" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          New Product
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Image
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Title
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Stock
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products!.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                    {product.title}
                  </Link>
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {currencyFormater(product.price)}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.gender}
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {product.inStock}
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
