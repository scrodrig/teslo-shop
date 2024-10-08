'use client'

import { currencyFormater, sleep } from '@/utils'
import { useAddressStore, useCartStore } from '@/store'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import clsx from 'clsx'
import { placeOrder } from '@/actions'
import { useRouter } from 'next/navigation'

export const PlaceOrder = () => {

  const router = useRouter()

  const [loaded, setLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = useAddressStore((state) => state.address)
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  const { subTotal, tax, totalItems, totalPrice } = useCartStore((state) =>
    state.getSummaryInformation()
  )

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }


  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)
    //Todo: Create an order
    
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    
    const response = await placeOrder(productsToOrder, address)
    console.log("🚀 ~ onPlaceOrder ~ response:", response)
    
    if(!response.success){
      setIsPlacingOrder(false)
      setErrorMessage(response.message ?? '')
      return
    }

    // To this point, the order was created successfully
    clearCart()

    router.replace(`/orders/${response.order?.id}`)
    

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

      <p className='text-red-500'>{errorMessage}</p>

      <div className="mt-5 mb-2 w-full">
        <button
          onClick={onPlaceOrder}
          className={clsx('flex justify-center', {
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}>
          Place Order
        </button>
      </div>
    </div>
  )
}
