'use server'

import { PayPalOrderStatusResponse, Paypal } from '@/interfaces'

import prisma from '@/lib/prisma'

export const paypalCheckPayment = async (transactionId?: string) => {
  const authToken = await getPayPalBearerToken()

  if (!authToken) {
    return {
      success: false,
      message: 'Error getting PayPal token',
    }
  }

  console.log('🚀 ~ paypalCheckPayment ~ authToken:', authToken)
  console.log('🚀 ~ paypalCheckPayment ~ transactionId:', transactionId)

  const resp = await verifyPaypalPayment(transactionId, authToken)

  if (!resp) {
    return {
      success: false,
      message: 'Error verifying PayPal payment',
    }
  }

  const { status, payer, purchase_units } = resp
  console.log('🚀 ~ paypalCheckPayment ~ status:', { status, purchase_units })

  if (status !== 'COMPLETED') {
    return {
      success: false,
      message: 'Payment not completed',
    }
  }

  //TODO: Update our database with the payment status

  try {
    const order = await prisma.order.update({
      where: {
        id: '',
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    })

    //TODO: Revalidate path
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: 'Error updating payment status',
    }
  }

  // return {}
}

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`, 'utf-8').toString(
    'base64'
  )

  const headersList = {
    Accept: '*/*',
    Authorization: `Basic ${base64Token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const bodyContent = 'grant_type=client_credentials'

  const resultOptions = {
    method: 'POST',
    body: bodyContent,
    headers: headersList,
  }

  try {
    const response = await fetch(oauth2Url, {
      ...resultOptions,
      cache: 'no-store',
    }).then((res) => res.json())
    return response.access_token
  } catch (e) {
    console.log(e)
    return null
  }
}

const verifyPaypalPayment = async (
  transactionId?: string,
  authToken?: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`

  let headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${authToken}`,
  }

  try {
    let response = await fetch(paypalOrderUrl, {
      method: 'GET',
      headers: headersList,
      cache: 'no-store',
    }).then((res) => res.json())

    return response
  } catch (e) {
    console.log(e)
    return null
  }
}
