'use server'

import { Address } from '@/interfaces'
import prisma from '@/lib/prisma'

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    // This is where the logic to set user address would go
    const newAddress = await createOrReplaceUserAddress(address, userId)
    // For now, we will just return a success message
    return {
      success: true,
      message: 'User address set successfully',
      address: newAddress,
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: 'An error occurred while setting user address',
    }
  }
}

const createOrReplaceUserAddress = async (address: Address, userId: string) => {
  try {
    // This is where the logic to create or replace user address would go

    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    })

    const addressToSave = {
      userId,
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      zipCode: address.zipCode,
    }

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: {
          ...addressToSave,
        },
      }) // Add the address object here
      return newAddress
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: {
        ...addressToSave,
      },
    })

    return updatedAddress

  } catch (e) {
    console.log(e)
    throw new Error('An error occurred while creating or replacing user address')
  }
}
