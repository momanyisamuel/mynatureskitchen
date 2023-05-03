import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect } from "react";

const Success = ({}) => {
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart();
  }, [resetCart]);
  return (
    <div className="h-screen bg-atlantis-50 flex justify-center">
      <div className="bg-atlantis-50 p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="mx-auto my-6 h-16 w-16 text-atlantis-600"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="text-center text-base font-semibold text-atlantis-900 md:text-2xl">
            Payment Done!
          </h3>
          <p className="my-2 text-atlantis-600">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <Link
              href="/"
              className="bg-atlantis-600 px-12 py-3 font-semibold text-white hover:bg-atlantis-500"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
