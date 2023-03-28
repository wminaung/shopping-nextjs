import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { CartItem } from "@/types/types";
import { Box } from "@mui/material";
import type { AppProps } from "next/app";
import { useState } from "react";

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
      <Navbar count={quantityList.reduce((prev, cur) => prev + cur, 0)} />
      <Box className="py-8 "></Box>
      <Component
        orderItems={orderItems}
        {...pageProps}
        handleAddToCart={handleAddToCart}
        setOrderItems={setOrderItems}
      />
      <Footer />
    </>
  );
}
