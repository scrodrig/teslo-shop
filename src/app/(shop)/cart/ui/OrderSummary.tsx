'use client'

import { useEffect, useState } from 'react'

import { currencyFormater } from '@/utils'
import { useCartStore } from '@/store'
import { useRouter } from 'next/navigation'

export const OrderSummary = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  const { subTotal, tax, totalItems, totalPrice } = useCartStore((state) =>
    state.getSummaryInformation()
  )

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (totalItems === 0 && loaded === true) {
      router.replace('/empty')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, loaded])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <>
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
    </>
  )
}
