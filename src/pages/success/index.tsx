import { useCart } from "@/context/CartContext";
import { FC, useEffect } from "react";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart()
  }, [resetCart])
  return <div>index</div>;
};

export default index;
