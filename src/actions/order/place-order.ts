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

  if (!userId) {
    return {
      success: false,
      message: 'User not found',
    }
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((product) => product.productId),
      },
    },
  })

  const itemsInOrder = productsId.reduce((count, item) => count + item.quantity, 0)
  const { subTotal, totalPrice, tax } = productsId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity
      const product = products.find((product) => product.id === item.productId)

      if (!product) {
        return { subTotal: 0, tax: 0, totalPrice: 0 }
      }

      const subTotal = product.price * productQuantity
      totals.subTotal += subTotal

      totals.tax += subTotal * 0.23

      totals.totalPrice += subTotal + totals.tax

      return totals
    },
    { subTotal: 0, tax: 0, totalPrice: 0 }
  )

  console.log('🚀 ~ placeOrder ~ subTotal, totalPrice, tax :', subTotal, totalPrice, tax)

  //! Transaction to create an order https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions

  const prismaTx = await prisma.$transaction(async (tx) => {
    // Update stock
    // Create order header - details
    const order = await tx.order.create({
      data: {
        userId,
        totalItems: itemsInOrder,
        subTotal,
        totalPrice,
        tax,
        OrderItem: {
          createMany: {
            data: productsId.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
              size: product.size,
              price: products.find((p) => p.id === product.productId)?.price ?? 0,
            })),
          },
        },
      },
    })
    //? Verify if price is zero
    // Create order address
    const {country, ...restAddress} = address

    const orderAddress = await tx.orderAddress.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order.id,
      },
    })

    //Return order

    return {
      order: order,
      updatedProducts: [],
      orderAddress: orderAddress,
    }
  })

  return {
    success: false,
    message: 'Order not placed',
  }
}
