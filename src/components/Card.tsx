import { FC, useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Price } from "@/types/types";

interface CardProps {
  price: Price;
}

const Card: FC<CardProps> = ({ price }) => {
  const { items, addItem } = useCart();
  const [error, setError] = useState<string>("");
  const { product, unit_amount } = price;

  const addItemToCart = (price: Price) => {
    const found = items.find((p) => p.id === price.id);
    if (found) {
      setError("Item has been added!");
      return;
    }
    addItem(price);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <Image
            src={product.images[0] ? product.images[0] : ""}
            alt={product.description}
            className="object-scale-down"
            fill
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            {(unit_amount / 100).toLocaleString("en-CA", {
              style: "currency",
              currency: "CAD",
            })}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => addItemToCart(price)}
          className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Add to Cart<span className="sr-only">, {product.name}</span>
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default Card;
