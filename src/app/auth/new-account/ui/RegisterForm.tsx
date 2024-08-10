'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import Link from 'next/link'
import clsx from 'clsx'
import { registerUser } from '@/actions'
import { useState } from 'react'

type FormInputs = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  // const onSubmit = async (data: FormInputs) => {
  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setErrorMessage('')
    const { name, email, password } = data
    //Server action
    const resp = await registerUser(email, password, name)

    if (resp.status !== 'success') {
      setErrorMessage(resp.message)
      return
    }

    console.log('🚀 ~ constonSubmit:SubmitHandler<FormInputs>= ~ resp:', resp)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Full name</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name,
        })}
        type="text"
        autoFocus
        {...register('name', { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email,
        })}
        type="email"
        {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
      />

      <label htmlFor="password">Password</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password,
        })}
        type="password"
        {...register('password', { required: true, minLength: 6 })}
      />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button className="btn-primary">Create Account</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Sign In
      </Link>
    </form>
  )
}
