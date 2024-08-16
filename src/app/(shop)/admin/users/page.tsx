// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, Title } from '@/components'

import { UsersTable } from './ui/UsersTable'
import { getPaginatedUsers } from '@/actions'
import { redirect } from 'next/navigation'

export default async function UsersPage() {
  const { success, users= [] } = await getPaginatedUsers()

  if (!success) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Users administrations" />
      <div className="mb-10">
        <UsersTable users={users} />
        <Pagination totalPages={1} />
      </div>
    </>
  )
}
