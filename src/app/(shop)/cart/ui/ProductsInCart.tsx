'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { QuantitySelector } from '@/components'
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
            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
              <p>{product.title} - {product.size}</p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector quantity={3} onQuantityChange={() => {}} />
            <button className="underline mt-3">Remove</button>
          </div>
        </div>
      ))}
    </>
  )
}
