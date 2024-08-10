import { AddressForm } from './ui/AddressForm'
import { Country } from '@/interfaces'
import { Title } from '@/components'
import { getCountry } from '@/actions'

export default async function AddressCheckoutPage() {
  const countries: Country[] = await getCountry()

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />
        <AddressForm countries={countries} />
      </div>
    </div>
  )
}
