'use server'

import prisma from "@/lib/prisma"

export const getCategories = async () => {
  try {

    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return categories

  }catch(error) {
    console.log('🚀 ~ file: get-categories.ts ~ line 3 ~ getCategories ~ error', error)
    return []
  }
}