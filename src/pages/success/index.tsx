import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

const Success = ({}) => {
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart()
  }, [resetCart])
  return <div>index</div>;
};

export default Success;
