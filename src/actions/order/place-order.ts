'use server'

import type { Address, Size } from '@/interfaces'

import { auth } from '@/auth.config'

interface ProductsInOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (productsId: ProductsInOrder[], address: Address) => {
  const session = await auth()

  const userId = session?.user.id

  console.log('🚀 ~ placeOrder ~ productsId:', productsId)
  console.log('🚀 ~ placeOrder ~ address:', address)

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
