'use server'

import prisma from '@/lib/prisma'

export const getProductbySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    const { ProductImage, ...rest } = product

    return {
      ...rest,
      images: product.ProductImage.map((image) => image.url),
    }
  } catch (error) {
    throw new Error('Error to get product by slug')
  }
}
