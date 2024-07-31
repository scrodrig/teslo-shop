'use client'

import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { usePathname, useSearchParams } from 'next/navigation'

import Link from 'next/link'
import path from 'path'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) ?? 1

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathName}`
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathName}?${params.toString()}`
  }

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}>
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#">
              1
            </Link>
          </li>
          <li className="page-item active">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
              href="#">
              2 <span className="visually-hidden"></span>
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}>
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
