'use server'

import { Gender, Product, Size } from '@prisma/client'

import prisma from '@/lib/prisma'
import { revalidate } from '@/app/(shop)/page'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => val.toFixed(2)),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => val.toFixed(0)),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
})

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)
  console.log('parsedProduct', productParsed)

  if (!productParsed.success) {
    console.log(productParsed.error)
    return {
      success: false,
      message: 'Invalid product data',
    }
  }

  const product = productParsed.data

  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, ...productData } = product

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product
      const tagsArray = productData.tags.split(',').map((tag) => tag.trim().toLowerCase())

      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...productData,
            inStock: parseFloat(productData.inStock),
            price: parseFloat(productData.price),
            sizes: { set: productData.sizes as Size[] },
            tags: { set: tagsArray },
          },
        })
      } else {
        product = await prisma.product.create({
          data: {
            ...productData,
            inStock: parseFloat(productData.inStock),
            price: parseFloat(productData.price),
            sizes: {
              set: productData.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        })
      }

      return {
        product,
      }
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/product/${product.slug}`)

    return {
      success: true,
      product: prismaTx.product,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Error saving product',
    }
  }
}
