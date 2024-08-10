import { RegisterForm } from './ui/RegisterForm'
import { titleFont } from '@/config/fonts'

export default function SignUp() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Sign up</h1>
      <RegisterForm />
    </div>
  )
}
