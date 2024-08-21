'use server'

import prisma from '@/lib/prisma'

export const getProductbySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    })

    if (!product) {
      return null
    }

    // const { ProductImage, ...rest } = product

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    }
  } catch (error) {
    throw new Error('Error to get product by slug')
  }
}
