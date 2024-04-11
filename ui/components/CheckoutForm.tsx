import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  styled,
  Stack,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useShopper } from "@/src/store/slices/shopperSlice";
import Link from "next/link";
import { config } from "@/src/config/config";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutForm: React.FC = () => {
  const { actions, state, dispatch } = useShopper();
  const orders = state.orders.items;
  const [order, setOrder] = useState<Product[]>([
    { id: 1, name: "Product 1", price: 19.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 29.99, quantity: 2 },
  ]);

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    const updatedOrder = orders.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    dispatch(actions.setOrders(updatedOrder));
  };

  const handleRemoveProduct = (productId: number) => {
    const updatedOrder = orders.filter((item) => {
      return String(item.product.id) !== String(productId);
    });
    dispatch(actions.setOrders(updatedOrder));
  };

  const calculateTotal = () => {
    return orders.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <StyledContainer maxWidth="md">
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Link
          style={{
            position: "absolute",
            left: "0px",
          }}
          href={`${config.baseUrl}/products`}
        >
          Back to Shop
        </Link>
      </Box>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {orders.map(({ id, product, quantity }) => (
          <Grid item xs={12} key={id}>
            <ProductItem>
              <Typography variant="body1">
                {product.title} - ${product.price.toFixed(2)} - Quantity:{" "}
                {quantity}
                <StyledIconButton
                  onClick={() => {
                    handleRemoveProduct(product.id);
                  }}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </StyledIconButton>
              </Typography>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    handleUpdateQuantity(product.id, quantity + 1);
                  }}
                  variant="contained"
                  color="primary"
                >
                  +
                </Button>
                <Button
                  onClick={() => {
                    handleUpdateQuantity(product.id, quantity - 1);
                  }}
                  variant="contained"
                  color="secondary"
                  disabled={quantity === 1}
                >
                  -
                </Button>
              </ButtonGroup>
            </ProductItem>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Place Order
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)({
  textAlign: "center",
  marginTop: "50px",
});

const ProductItem = styled("div")({
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledIconButton = styled(IconButton)({
  marginLeft: "10px",
});

const ButtonGroup = styled(Grid)({
  marginTop: "10px",
});

export default CheckoutForm;
