'use client'

import { CreateOrderActions, CreateOrderData } from '@paypal/paypal-js'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

interface Props {
  orderId: string,
  amount: number
}

export const PayPalButton = ({orderId, amount}:Props) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = Math.round(amount * 100) / 100

  if (isPending) {
    return (
      <div className="animate-pulse mb-10">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="mt-2 h-11 bg-gray-300 rounded" />
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: `${roundedAmount}`,
          },
        },
      ],
      intent: 'CAPTURE'
    })
    console.log("🚀 ~ createOrder ~ transactionId:", transactionId)
    
    // if()
    
    return transactionId
  }

  return <PayPalButtons createOrder={createOrder} />
}
