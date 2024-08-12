import Image from 'next/image'
import Link from 'next/link'
import { PlaceOrder } from './ui/PlaceOrder'
import { ProductsInCart } from './ui/ProductsInCart'
import { Title } from '@/components'

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Shopping cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust elements</span>
            <Link href="/" className="underline mb-5">
              Edit shopping cart
            </Link>
            {/* Product list */}
            <ProductsInCart />
          </div>
          {/* Checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}
