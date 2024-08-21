import { getCategories, getProductbySlug } from "@/actions";

import { ProductForm } from "./ui/ProductForm";
import { Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({params}: Props) {

  const { slug } = params

  const [product, categories] = await Promise.all([
    getProductbySlug(slug),
    getCategories()
  ])


  if(!product) {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'New product' : 'Edit product'

  return (
    <>
      <Title title={title} />
      
      <ProductForm product={product} categories={categories} />
    </>
  );
}