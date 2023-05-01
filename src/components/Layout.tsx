import { type FC, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import Cart from "./Cart";
import Header from "./Header";
import Head from "next/head";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [cartSliderIsOpen, setCartSliderIsOpen] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>My natures kitchen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={cn("bg-atlantis-50 font-sans antialiased", fontSans.variable)}
      >
        <Header setCartSliderIsOpen={setCartSliderIsOpen} />
        <Cart
          open={cartSliderIsOpen}
          setCartSliderIsOpen={setCartSliderIsOpen}
        />
        {children}
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
