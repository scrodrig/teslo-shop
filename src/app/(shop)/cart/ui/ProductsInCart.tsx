'use client'

import { useEffect, useState } from 'react'

import { CartItem } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store'

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  const onQuantityChange = (product: CartItem, quantity: number) => {
    updateProductQuantity(product, quantity)
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mt-5">
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
              <p>
                {product.title} - {product.size}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) => onQuantityChange(product, quantity)}
            />
            <button className="underline mt-3" onClick={() => removeFromCart(product)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
