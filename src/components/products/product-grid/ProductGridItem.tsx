import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";

interface ProductGridItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductGridItemProps) => {
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          className="w-full object-cover"
          width={500}
          height={500}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link
          href={`/products/${product.slug}`}
          className="hover:text-blue-500"
        >
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
