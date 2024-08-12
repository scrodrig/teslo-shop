'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { currencyFormater } from '@/utils'
import { useCartStore } from '@/store'

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
            style={{ width: '100px', height: '100px' }}
          />
          <div>
            <span>
              <p>
                {product.title} - {product.size}
              </p>
            </span>
            <p className="font-bold">{currencyFormater(product.price)}</p>
          </div>
        </div>
      ))}
    </>
  )
}
