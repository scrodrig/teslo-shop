import Image from 'next/image'
import Link from 'next/link'
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
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">John Doe</p>
              <p>Av. Siempre Viva 123</p>
              <p>Col. Central</p>
              <p>Alcaldia Cauctemoc</p>
              <p>Porto</p>
              <p>4000-123</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos</span>
              <span className="text-right">$23</span>

              <span className="text-xl font-bold mt-5">Total:</span>
              <span className="text-xl mt-5 text-right">$123</span>
            </div>

            <p className="text-xs">
              {`By clicking on Place Order" you agree to our `}
              <Link href="#" className="underline">
                terms and conditions
              </Link>
            </p>

            <div className="mt-5 mb-2 w-full">
              <Link href="/orders/123" className="flex justify-center btn-primary">
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
