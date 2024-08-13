'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderByID = async (id: string) => {
  const session = await auth()

  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized',
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    })

    if (!order) throw new Error(`Order ${id} not found`)
    if (order.userId !== session.user.id) throw new Error(`Unauthorized not ${id}`)

    return {
      success: true,
      order,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Go to the administator',
    }
  }
}
