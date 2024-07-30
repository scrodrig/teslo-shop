import { ProductSlideshow, ProductSlideshowMobile, QuantitySelector, SizeSelector } from "@/components";

import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params: { slug } }: ProductPageProps) {
  console.log("slug", slug);

  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
      {/*Slideshow desktop*/}
        <ProductSlideshow images={product.images} title={product.title} className="hidden md:block" />
      {/*Slideshow mobile*/}
        <ProductSlideshowMobile images={product.images} title={product.title} className="block md:hidden" />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiases font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* Size selector */}
        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[1]}/>
        {/* Quantity selector */}
        <QuantitySelector quantity={0}/>
        {/* Button */}
        <button className="btn-primary my-5">Add to cart</button>
        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
