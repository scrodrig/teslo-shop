'use client'

import { useEffect, useState } from 'react'

import { getStockBySlug } from '@/actions/product/get-stock-by-slug'
import { titleFont } from '@/config/fonts'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(2)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock()
  }, [])

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
  }

  return <h1 className={`${titleFont.className} antialiases font-bold text-md`}>Stock: {stock}</h1>
}
