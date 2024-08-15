'use server'

import prisma from '@/lib/prisma'

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    })

    if (!order) {
      console.log('🚀 ~ setTransactionId ~ order:', order)
      return {
        success: false,
        message: `Not order found with id ${orderId}`,
      }
    }

    return {
      success: true,
      message: 'Transaction id set successfully',
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: 'Error setting transaction id',
    }
  }
}
