'use client'

import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import React, { useEffect, useState } from 'react'
import { useCartStore, useUiStore } from '@/store'

import Link from 'next/link'
import { titleFont } from '@/config/fonts'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)
  const totalItemsInCart = useCartStore((state) => state.getTotalItems())

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* {Logo} */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* {Top Menu} */}
      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">
          Men
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">
          Women
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">
          Kids
        </Link>
      </div>

      {/* Seach, {Cart}, Menu */}
      <div className="flex items-center">
        <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href="/cart">
          <div className="relative">
            {
              // Show the number of items in the cart
              (loaded && totalItemsInCart > 0) && (
                <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                  {totalItemsInCart}
                </span>
              )
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => openMenu()}>
          Menu
        </button>
      </div>
    </nav>
  )
}
