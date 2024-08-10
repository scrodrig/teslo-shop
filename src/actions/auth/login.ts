'use server'

import { signIn } from '@/auth.config'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {
      redirect: false,
      ...Object.fromEntries(formData),
    })
    return 'Success'
  } catch (error) {
    console.log(error)
    return 'CredentialsSignin'
  }
}


export async function login(email: string, password: string) {
  try {
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    return {
      status: 'success',
      message: 'User logged in successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'Error logging in',
    }
  }
}
