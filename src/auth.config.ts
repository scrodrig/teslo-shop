import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth'
import SignUp from './app/auth/new-account/page';
import { z } from 'zod';

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
          .safeParse(credentials);

          if (!parsedCredentials.success) {
            return null;
          }

          const { email, password } = parsedCredentials.data;

          console.log('email', email);
          console.log('password', password);

          //Look for the user in the database

          //If the user is not found, return null

          //If the user is found, return the user object

          return null;
      },
    }),
  ],
}

export const { signIn, signOut, auth } = NextAuth(authConfig);