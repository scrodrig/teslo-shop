'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderByUserId = async () => {
  const session = await auth()

  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized',
    }
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      OrderAddress:{
        select:{
          firstName:true,
          lastName:true,
        }
      }
    }
  })

  return {
    success: true,
    orders,
  }
}
