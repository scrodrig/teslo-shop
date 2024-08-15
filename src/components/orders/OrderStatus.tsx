import { IoCartOutline } from 'react-icons/io5'
import React from 'react'
import clsx from 'clsx'

interface Props {
  isPaid: boolean
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
        { 'bg-red-500': !isPaid, 'bg-green-800': isPaid }
      )}>
      <IoCartOutline size={30} />
      {/* <span>Payment pending</span> */}
      <span>{isPaid ? 'Payment done' : 'Payment pending'}</span>
    </div>
  )
}
