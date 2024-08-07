import { Title } from '@/components'
import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    return redirect('/')
  }

  return (
    <div>
      <Title title="Profile" />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
