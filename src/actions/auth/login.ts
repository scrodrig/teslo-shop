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
