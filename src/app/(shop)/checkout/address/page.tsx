import Link from "next/link";
import { Title } from "@/components";

export default function AddressCheckoutPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span>Names</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Last Names</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address 2 (opcional)</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>ZIP Code</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>City</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Country</span>
            <select className="p-2 border rounded-md bg-gray-200">
              <option value="">[ Select ]</option>
              <option value="PT">Portugal</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Phone</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link
              href="/checkout"
              className="btn-primary flex w-full sm:w-1/2 justify-center "
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
