// "use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChange: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {

  const onValueChange = (value: number) => {
    if(quantity + value < 1) return;
    onQuantityChange(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 bg-gray-100 text-center rounded">{quantity}</span>
      <button onClick={() => onValueChange(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
