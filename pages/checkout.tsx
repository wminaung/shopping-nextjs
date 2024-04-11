import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useShopper } from "@/src/store/slices/shopperSlice";
import CheckoutForm from "@/ui/components/CheckoutForm";

const CheckoutPage = () => {
  const { actions, state } = useShopper();
  const orders = state.orders.items;
  console.log(orders);

  const productIds = orders.map((o) => o.product.id);

  const uniqueProductIds = productIds.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });

  console.log({ uniqueProductIds });

  const [order, setOrder] = useState<
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[]
  >([
    { id: 1, name: "Product 1", price: 19.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 29.99, quantity: 2 },
  ]);

  return <CheckoutForm />;
};

export default CheckoutPage;
