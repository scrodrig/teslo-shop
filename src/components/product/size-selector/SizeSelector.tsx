import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChange }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available Sizes</h3>

      <div className="flex">
        {availableSizes.map((size) => {
          return (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={clsx("mx-2 hover:underline text-lg", {
                underline: selectedSize === size,
              })}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};
