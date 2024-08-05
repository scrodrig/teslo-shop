'use client'

import { Product, Size } from '@/interfaces'
import { QuantitySelector, SizeSelector } from '@/components'

import { useState } from 'react';

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {


  const [size, setSize] = useState<Size|undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState<boolean>(false)

  const addToCart = () => {
    setPosted(true)
    if(!size) return
    console.log('Add to cart', product, size, quantity)
  }

  return (
    <>
      {posted && !size && <p className="text-red-500 fade-in">Please select a size</p>}
      {/* Size selector */}
      <SizeSelector availableSizes={product.sizes} selectedSize={size} onSizeChange={setSize} />
      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity}/>
      {/* Button */}
      <button className="btn-primary my-5" onClick={addToCart}>Add to cart</button>
    </>
  )
}
