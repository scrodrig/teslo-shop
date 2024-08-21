export const revalidate = 604800 // 1 week

import { Metadata, ResolvingMetadata } from 'next'
import {
  ProductSlideshow,
  ProductSlideshowMobile,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from '@/components'

import { AddToCart } from './ui/AddToCart'
import { getProductbySlug } from '@/actions'
import { notFound } from 'next/navigation'
import { titleFont } from '@/config/fonts'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductbySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Not found product',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Not found product',
      description: product?.description ?? '',
      images: [`/product/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({ params: { slug } }: ProductPageProps) {
  const product = await getProductbySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/*Slideshow desktop*/}
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
        {/*Slideshow mobile*/}
        <ProductSlideshowMobile
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiases font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  )
}
