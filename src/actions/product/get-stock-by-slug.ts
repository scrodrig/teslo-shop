'use server'

import prisma from '@/lib/prisma'
import { sleep } from '@/utils'

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    }) // Add the query to get the stock by slug
    console.log('stock', stock)
    return stock?.inStock || 0
  } catch (error) {
    console.log('stock en error', error)
    return 0
  }
}
