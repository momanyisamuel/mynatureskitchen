import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";

interface HeaderProps {
    setCartSliderIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({setCartSliderIsOpen}) => {
  const { items } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="font-sans">
      <header className="flex items-center justify-between bg-gray-200 px-8 py-6">
        <div className="flex gap-6">
        <Link href="/" >
            <div className="text-lg font-medium uppercase text-sky-700">
              Home
            </div>
        </Link>
        <Link href="/classes" >
            <div className="text-lg font-medium uppercase text-sky-700">
              Classes
            </div>
        </Link>
        </div>
        <div className="flex items-center gap-4">
          <Search
            onClick={() => setOpen((open) => !open)}
            className="mt-1 h-5 w-5 cursor-pointer text-sky-700 group-hover:text-sky-800"
          />
          <div className="ml-4 flow-root lg:ml-8">
            <div
              className="group flex cursor-pointer items-center p-2"
              onClick={() => setCartSliderIsOpen((open:boolean) => !open)}
            >
              <ShoppingBag
                className="h-5 w-5 flex-shrink-0 text-sky-700 group-hover:text-sky-800"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-sky-700 group-hover:text-sky-800">
                ( {items.length} )
              </span>
              <span className="sr-only">items in cart, view bag</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
