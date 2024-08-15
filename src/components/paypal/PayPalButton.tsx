'use client'

import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { paypalCheckPayment, setTransactionId } from '@/actions'

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {
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

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId, //? This is the order ID, unique in paypal
          amount: {
            currency_code: 'EUR',
            value: `${roundedAmount}`,
          },
        },
      ],
      intent: 'CAPTURE',
    })

    const { success } = await setTransactionId(orderId, transactionId)

    console.log('🚀 ~ createOrder ~ transactionId:', success)

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    console.log("🚀 ~ onApprove ~ details:", details)

    if(!details) return

    await paypalCheckPayment(details.id)
  }

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
}
