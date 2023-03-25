import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState("helo");

  return (
    <>
      <Navbar />
      <Component cart={cart} {...pageProps} />
    </>
  );
}
