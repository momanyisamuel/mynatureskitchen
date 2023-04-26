import { useCart } from "@/context/CartContext";
import { Facebook, Instagram, Search, ShoppingBag, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import logo from "../../public/assets/my natures logo.svg";

interface HeaderProps {
    setCartSliderIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({setCartSliderIsOpen}) => {
  const { items } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="font-sans">
      <header className="flex items-center justify-between bg-atlantis-50 px-8 py-4">
  
        <div className="flex gap-6">
        <Link href="/" >
            <div className="text-lg font-medium text-atlantis-900">
              Home
            </div>
        </Link>
        <Link href="/about" >
            <div className="text-lg font-medium text-atlantis-900">
              About
            </div>
        </Link>
        <Link href="/classes" >
            <div className="text-lg font-medium text-atlantis-900">
              Food for life Classes
            </div>
        </Link>
        </div>
        <div className="">
          <Image src={logo} height={100} width={100} alt="logo"/>
        </div>
        <div className="flex items-center gap-4">
          <Facebook className="w-6 h-8 text-atlantis-900"/>
          <Youtube className="w-6 h-8 text-atlantis-900"/>
          <Instagram className="w-6 h-8 text-atlantis-900"/>
          <div className="ml-4 flow-root lg:ml-8">
            <div
              className="group flex cursor-pointer items-center p-2"
              onClick={() => setCartSliderIsOpen((open:boolean) => !open)}
            >
              <ShoppingBag
                className="h-5 w-5 flex-shrink-0 text-atlantis-900 group-hover:text-atlantis-800"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-atlantis-900 group-hover:text-atlantis-800">
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
