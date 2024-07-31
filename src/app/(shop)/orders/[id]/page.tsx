import { QuantitySelector, Title } from "@/components";

import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import clsx from "clsx";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface OrdersByPageProps {
  params: {
    id: string;
  };
}

export default function OrdersByIdPage({ params: { id } }: OrdersByPageProps) {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Shopping cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                { "bg-red-500": false, "bg-green-800": true }
              )}
            >
              <IoCartOutline size={30} />
              {/* <span>Payment pending</span> */}
              <span>Payment done</span>
            </div>
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
                  <p className="font-bold">Subtotal: ${product.price}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">John Doe</p>
              <p>Av. Siempre Viva 123</p>
              <p>Col. Central</p>
              <p>Alcaldia Cauctemoc</p>
              <p>Porto</p>
              <p>4000-123</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  { "bg-red-500": false, "bg-green-800": true }
                )}
              >
                <IoCartOutline size={30} />
                {/* <span>Payment pending</span> */}
                <span>Payment done</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
