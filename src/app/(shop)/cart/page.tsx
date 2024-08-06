import Link from 'next/link'
import { OrderSummary } from './ui/OrderSummary'
import { ProductsInCart } from './ui/ProductsInCart'
import { Title } from '@/components'

export default function CartPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Shopping cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Shopping cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-5">
              Keep shopping
            </Link>
            {/* Product list */}
            <ProductsInCart />
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            {/* <div className="bg-white rounded-xl shadow-xl p-7 h-[300px]"> */}
            <h2 className="text-2xl mb-2">Order Summary</h2>
            
            <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <Link href="/checkout/address" className="flex justify-center btn-primary">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
