import { getCountry, getUserAddress } from '@/actions'

import { AddressForm } from './ui/AddressForm'
import { Country } from '@/interfaces'
import { Title } from '@/components'
import { auth } from '@/auth.config'

export default async function AddressCheckoutPage() {
  const countries: Country[] = await getCountry()

  const session = await auth()

  if (!session?.user) {
    return <h3 className="text-5xl">500 - There is no user</h3>
  }

  const userAdress = await getUserAddress(session.user.id)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />
        <AddressForm countries={countries} userStoreAddress={userAdress ?? undefined} />
      </div>
    </div>
  )
}
