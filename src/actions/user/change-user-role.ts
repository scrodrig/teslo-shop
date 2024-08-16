'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const changeUserRole = async (id: string, role: string) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const newRole = role !== 'admin' ? 'user' : 'admin'

    await prisma.user.update({
      where: { id },
      data: { role: newRole },
    })

    revalidatePath('/admin/users')

    return { success: true }
  } catch (error) {
    return { success: false, message: 'Error updating user' }
  }
}
