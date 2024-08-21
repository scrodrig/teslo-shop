'use server'

import { Gender } from '@prisma/client'
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
  const parsedProduct = productSchema.safeParse(data)
  console.log('parsedProduct', parsedProduct)

  if(!parsedProduct.success){
    console.log(parsedProduct.error)
    return {
      success: false,
      message: 'Invalid product data',	
    }
  }

  console.log(parsedProduct.data)

  return {
    success: true,
    message: 'Product created successfully',
  }
}
