'use server'

import type { Address, Size } from '@/interfaces'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

interface ProductsInOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (productsId: ProductsInOrder[], address: Address) => {
  const session = await auth()

  const userId = session?.user.id


  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((product) => product.productId),
      },
    },
  })


  const itemsInOrder = productsId.reduce((count, product) => count + product.quantity, 0)
  console.log("🚀 ~ placeOrder ~ itemsInOrder:", itemsInOrder)



  if (!userId) {
    return {
      success: false,
      message: 'User not found',
    }
  }

  return {
    success: false,
    message: 'Order not placed',
  }
}
