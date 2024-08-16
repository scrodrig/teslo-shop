'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getPaginatedUsers = async () => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return { success: false, message: 'Unauthorized' }
  }

  const users = await prisma.user.findMany({
    orderBy: { name: 'desc' },
  })

  return { success: true, users }
}
