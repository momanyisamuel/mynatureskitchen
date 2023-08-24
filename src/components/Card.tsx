import { type FC, useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import type { Price } from "@/types/types";
import { Button } from "./ui/button";

interface CardProps {
  price: Price
}

const Card: FC<CardProps> = ({ price }) => {
  const { items, addItem } = useCart();
  const [error, setError] = useState<string>("");
  const {title,description, product, price:{unit_amount} } = price;

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
    <div className="mb-5 w-full w-[300px] sm:w-[800px]">
      <div className="relative w-full">
        <div className="relative h-96 w-full overflow-hidden rounded-lg border">
          <Image
            src={product.images[0] ? product.images[0] : ""}
            alt={product.description}
            className="object-contain"
            fill
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-3xl font-serif font-medium text-atlantis-900 mb-4">{title}</h3>
          <p className="mt-1 text-lg text-atlantis-900">{description}</p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-96 items-end justify-end overflow-hidden rounded-lg p-4">
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
        <Button
          variant="secondary"
          onClick={() => addItemToCart(price)}
          className="bg-atlantis-500 hover:bg-atlantis-600"
        >
          ADD TO CART<span className="sr-only">, {product.name}</span>
        </Button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default Card;
