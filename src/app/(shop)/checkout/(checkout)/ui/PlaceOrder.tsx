'use client'

import { useAddressStore, useCartStore } from '@/store'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { currencyFormater } from '@/utils'

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false)

  const address = useAddressStore((state) => state.address)

  const { subTotal, tax, totalItems, totalPrice } = useCartStore((state) =>
    state.getSummaryInformation()
  )

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Delivery address</h2>
      <div className="mb-10">
        <p className="text-xl">{`${address.firstName} ${address.lastName}`}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city} - {address.country}
        </p>
        <p>{address.phone}</p>
        <p>{address.zipCode}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

      <h2 className="text-2xl mb-2">Order Summary</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {totalItems === 1 ? '1 article' : `${totalItems} articles`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormater(subTotal)}</span>

        <span>Impuestos</span>
        <span className="text-right">{currencyFormater(tax)}</span>

        <span className="text-xl font-bold mt-5">Total:</span>
        <span className="text-xl mt-5 text-right">{currencyFormater(totalPrice)}</span>
      </div>

      <p className="text-xs mt-5">
        {`By clicking on Place Order" you agree to our `}
        <Link href="#" className="underline">
          terms and conditions
        </Link>
      </p>

      <div className="mt-5 mb-2 w-full">
        <button className="flex justify-center btn-primary">Place Order</button>
      </div>
    </div>
  )
}
