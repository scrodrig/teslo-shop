'use server'

export const paypalCheckPayment = async (transactionId?: string) => {
  const authToken = await getPayPalBearerToken()
  
  if (!authToken) {
    return {
      success: false,
      message: 'Error getting PayPal token',
    }
  }
  
  console.log("🚀 ~ paypalCheckPayment ~ authToken:", authToken)
  console.log('🚀 ~ paypalCheckPayment ~ transactionId:', transactionId)
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
    const response = await fetch(oauth2Url, resultOptions).then((res) => res.json())
    return response.access_token
  } catch (e) {
    console.log(e)
    return null
  }
}
