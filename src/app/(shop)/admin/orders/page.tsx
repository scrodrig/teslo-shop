import { getOrderByUserId, getPaginatedOrders } from '@/actions'

import { IoCardOutline } from 'react-icons/io5'
import Link from 'next/link'
// https://tailwindcomponents.com/component/hoverable-table
import { Title } from '@/components'
import { redirect } from 'next/navigation'

export default async function OrdersPage() {
  const { success, orders= [] } = await getPaginatedOrders()

  if (!success) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Orders" />
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Status
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders!.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split('-').at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress &&
                    `${order.OrderAddress.firstName} ${order.OrderAddress.lastName}`}
                </td>

                {order.isPaid ? (
                  <>
                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </td>
                  </>
                )}

                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/orders/${order.id}`} className="hover:underline">
                    See order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
