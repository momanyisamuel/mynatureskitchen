import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Logo from "./ui/Logo";

const Footer: FC = ({}) => {
  return (
    <div className="bg-atlantis-50">
      <div className="flex flex-col px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-5 mt-8">
          <div className="flex items-center justify-start w-[30%]">
            <Logo />
          </div>
          <div className="flex flex-col gap-1 py-5 w-full sm:w-[20%]">
            <Link
              href="/"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Home</span>
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">About</span>
            </Link>
            <Link
              href="/classes"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Food for life Classes</span>
            </Link>
          </div>
          <div className="flex flex-col gap-1 py-5 w-full sm:w-[20%]">
            <Link
              href="/"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Facebook</span>
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Youtube</span>
            </Link>
            <Link
              href="/classes"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Instagram</span>
            </Link>
          </div>
          <div className="flex flex-col justify-start w-full sm:w-[50%]">
            <h2 className="font-extrabold mb-2 text-4xl uppercase">Keep in touch</h2>
            <p>Sign up to receive news and updates!</p>

            <div className="flex w-full gap-2">
              <Input placeholder="Your email address" className="w-[60%]" />
              <Button
                variant="outline"
                className="w-[40%] border-atlantis-100 bg-atlantis-100 hover:bg-atlantis-200"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="text-atlantis-900 mt-8 mb-5">
          <p>© {new Date().getFullYear()} My Natures Kitchen</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
