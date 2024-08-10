'use server'

import bycriptjs from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn } from '@/auth.config'

export async function registerUser(email: string, password: string, name: string) {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bycriptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return {
      status: 'success',
      message: 'User created successfully',
      user,
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'Error creating user',
    }
  }
}
