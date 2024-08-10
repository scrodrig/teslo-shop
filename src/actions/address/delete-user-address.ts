'use server'

import prisma from '@/lib/prisma'

export const deleteUserAddress = async (userId: string) => {
  try {
    const deleted = await prisma.userAddress.delete({
      where: { userId },
    })

    return {
      success: true,
      message: 'Address deleted successfully',
      address: deleted,
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: 'An error occurred while deleting address',
    }
  }
}
