'use server'

import { Gender } from '@prisma/client'
import prisma from '@/lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  //! 1. Get products with images
  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender: gender,
      },
    })
    //! 2. Total of pages
    const totalCount = await prisma.product.count({
      where: {
        gender: gender,
      },
    })
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => {
        return {
          ...product,
          images: product.ProductImage.map((image) => image.url),
        }
      }),
    }
  } catch (e) {
    throw new Error('Products not loaded')
  }
}
