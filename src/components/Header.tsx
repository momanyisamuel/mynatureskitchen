"use client";

import { useCart } from "@/context/CartContext";
import {
  Facebook,
  Instagram,
  MenuIcon,
  ShoppingBag,
  X,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";
import { Button } from "./ui/button";
import Logo from "./ui/Logo";

interface HeaderProps {
  setCartSliderIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ setCartSliderIsOpen }) => {
  const { items } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="font-sans">
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex-1 sm:hidden">
          {open ? (
            <Button onClick={() => setOpen(false)} variant="link">
              <MenuIcon className="text-atlantis-900" />
            </Button>
          ) : (
            <Button onClick={() => setOpen(true)} variant="link">
              <X className="text-atlantis-900" />
            </Button>
          )}
        </div>
        <div
          className={`${
            open ? "hidden sm:flex" : ""
          } absolute left-0 top-[155px] flex w-full flex-col bg-white sm:relative sm:top-0 sm:flex-1 sm:flex-row sm:gap-6 sm:bg-transparent`}
        >
          <Link
            href="/"
            className="border-b border-atlantis-900 py-3 pl-2 text-lg font-medium text-atlantis-900 hover:border-b hover:border-atlantis-900 sm:border-transparent sm:py-1 sm:pl-0"
          >
            <span className="">Home</span>
          </Link>
          <Link
            href="/about"
            className="border-b border-atlantis-900 py-3 pl-2 text-lg font-medium text-atlantis-900 hover:border-b hover:border-atlantis-900 sm:border-transparent sm:py-1 sm:pl-0"
          >
            <span className="">About</span>
          </Link>
          <Link
            href="/classes"
            className="border-b border-atlantis-900 py-3 pl-2 text-lg font-medium text-atlantis-900 hover:border-b hover:border-atlantis-900 sm:border-transparent sm:py-1 sm:pl-0"
          >
            <span className="">Food for life Classes</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="ml-auto flow-root lg:ml-8">
            <div
              className="group flex cursor-pointer items-center p-2"
              onClick={() => setCartSliderIsOpen((open) => !open)}
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
