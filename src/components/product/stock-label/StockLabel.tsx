'use client'

import { useEffect, useState } from 'react'

import { getStockBySlug } from '@/actions/product/get-stock-by-slug'
import { titleFont } from '@/config/fonts'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
    setIsLoading(false)
  }

  return (
    <>
      {!isLoading ? (
        <h1 className={`${titleFont.className} antialiases font-bold text-md`}>Stock: {stock}</h1>
      ) : (
        <h1
          className={`${titleFont.className} antialiases font-bold text-md bg-gray-200 animate-pulse`}>
          &nbsp;
        </h1>
      )}
    </>
  )
}
