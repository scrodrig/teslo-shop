import Image from 'next/image'
import { IoCartOutline } from 'react-icons/io5'
import { PayPalButton } from '../../../../components/paypal/PayPalButton';
import { Title } from '@/components'
import clsx from 'clsx'
import { currencyFormater } from '@/utils'
import { getOrderByID } from '@/actions'
import { redirect } from 'next/navigation'

interface OrdersByPageProps {
  params: {
    id: string
  }
}

export default async function OrdersByIdPage({ params: { id } }: OrdersByPageProps) {
  const { success, order } = await getOrderByID(id)

  if (!success) {
    redirect('/orders')
  }

  const address = order!.OrderAddress

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split('-').at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Shopping cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                { 'bg-red-500': !order?.isPaid, 'bg-green-800': order?.isPaid }
              )}>
              <IoCartOutline size={30} />
              {/* <span>Payment pending</span> */}
              <span>{order?.isPaid ? 'Payment done' : 'Payment pending'}</span>
            </div>
            {/* Product list */}
            {order?.OrderItem.map((item) => (
              <div key={`${item.product.slug} - ${item.size}`} className="flex">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{ width: '100px', height: '100px' }}
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>{currencyFormater(item.price)}</p>
                  <p className="font-bold">
                    Subtotal: {currencyFormater(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">{`${address?.firstName} ${address?.lastName}`}</p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{`${address?.city} - ${address?.countryId}`}</p>
              <p>{address?.phone}</p>
              <p>{address?.zipCode}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.totalItems === 1 ? '1 article' : `${order?.totalItems} articles`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormater(order!.subTotal)}</span>

              <span>Taxes</span>
              <span className="text-right">{currencyFormater(order!.tax)}</span>

              <span className="text-xl font-bold mt-5">Total:</span>
              <span className="text-xl mt-5 text-right">{currencyFormater(order!.totalPrice)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <PayPalButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
