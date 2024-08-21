'use server'

import { Gender, Product, Size } from '@prisma/client'

import { v2 as cloudinary } from 'cloudinary'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

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

      //Upload images
      if (formData.getAll('images')) {
        console.log('Uploading images')
        const images = await uploadImages(formData.getAll('images') as File[])
        console.log("🚀 ~ prismaTx ~ images:", images)
        if(!images) {
          throw new Error('Error uploading images')
        }

        await tx.productImage.createMany({
          data: images.map((url) => ({
            url: url as string,
            productId: product.id,
          })),
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

const uploadImages = async (images: File[]) => {
  try {
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        try {
          const buffer = await image.arrayBuffer()
          const base64Image = Buffer.from(buffer).toString('base64')

          return cloudinary.uploader
            .upload(`data:image/png;base64,${base64Image}`)
            .then((res) => res.secure_url)
        } catch (error) {
          console.error(error)
          return null
        }
      })
    )

    return uploadedImages
  } catch (error) {
    console.error(error)
    return null
  }
}
