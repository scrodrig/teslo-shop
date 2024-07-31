import { QuantitySelector, Title } from "@/components";

import Image from "next/image";
import Link from "next/link";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Shopping cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Shopping cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-5">
              Keep shopping
            </Link>
            {/* Product list */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{ width: "100px", height: "100px" }}
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className="underline mt-3">Remove</button>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos</span>
              <span className="text-right">$23</span>

              <span className="text-xl font-bold mt-5">Total:</span>
              <span className="text-xl mt-5 text-right">$123</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link href="/checkout/address" className="flex justify-center btn-primary">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
