import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Head from "next/head";
import CheckoutForm from "@/components/CheckoutForm";
import { CartItem, OrderItem, Product } from "@/types/types";

interface Props {
  orderItems: OrderItem[];
}

const CheckoutOrderList = ({ orderItems }: Props) => {
  const totalPrice = orderItems.reduce(
    (acc: any, curr: any) => acc + curr.price * curr.quantity,
    0
  );

  return (
    <React.Fragment>
      <Box className="py-8 "></Box>
      <Head>
        <title>Order Summary </title>
      </Head>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Order Summary
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.title}
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      ${item.price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default CheckoutOrderList;
