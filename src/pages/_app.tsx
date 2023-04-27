import { type AppProps, type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import "@/styles/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CartProvider from "@/context/CartContext";
import Layout from "@/components/Layout";
import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <CartProvider>
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </CartProvider>
  );
}) as AppType;

export default api.withTRPC(MyApp);
