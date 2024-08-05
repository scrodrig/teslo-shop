'use client'

import { Product, Size } from '@/interfaces'
import { QuantitySelector, SizeSelector } from '@/components'

import { useState } from 'react';

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {


  const [size, setSize] = useState<Size|undefined>()


  return (
    <>
      {/* Size selector */}
      <SizeSelector availableSizes={product.sizes} selectedSize={size} onSizeChange={setSize} />
      {/* Quantity selector */}
      <QuantitySelector quantity={0} />
      {/* Button */}
      <button className="btn-primary my-5">Add to cart</button>
    </>
  )
}
