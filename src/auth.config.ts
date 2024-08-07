import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import SignUp from './app/auth/new-account/page'
import bycriptjs from 'bcryptjs'
import prisma from './lib/prisma'
import { z } from 'zod'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        const { email, password } = parsedCredentials.data

        //Look for the user in the database

        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        })
        //If the user is not found, return null
        if (!user) return null

        //If the user is found, compare the password
        // const passwordMatch = user.password === password
        if (!bycriptjs.compareSync(password, user.password)) return null

        //If the user is found, return the user object

        const { password: _, ...rest } = user
        console.log('🚀 ~ authorize ~ rest:', rest)

        return rest
      },
    }),
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
