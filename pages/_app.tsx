import "@/styles/globals.css";
import { CartItem } from "@/src/types/types";
import type { AppProps } from "next/app";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

import ShopperContextProvider from "@/src/context/ShopperContextProvider";
import AdminContextProvider from "@/src/context/AdminContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <AdminContextProvider>
          <ShopperContextProvider>
            <Component {...pageProps} />
          </ShopperContextProvider>
        </AdminContextProvider>
      </SessionProvider>
    </>
  );
}
