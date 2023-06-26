import "@/styles/globals.css";
import { CartItem } from "@/types/types";
import type { AppProps } from "next/app";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Layout from "./layout";
import ShopperContextProvider from "@/context/ShopperContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);

  const handleAddToCart = (id: number) => {
    const foundCartItem = orderItems.find((cartItem) => cartItem.id === id);
    if (!foundCartItem) {
      setOrderItems([...orderItems, { id, quantity: 1 }]);
      return;
    }
    setOrderItems(
      orderItems.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      })
    );
  };

  const quantityList = orderItems.map((orderItem) => orderItem.quantity);

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ShopperContextProvider>
          <Layout quantityList={quantityList}>
            <Component
              orderItems={orderItems}
              {...pageProps}
              handleAddToCart={handleAddToCart}
              setOrderItems={setOrderItems}
            />
          </Layout>
        </ShopperContextProvider>
      </SessionProvider>
    </>
  );
}
