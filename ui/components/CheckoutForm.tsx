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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useShopper } from "@/src/store/slices/shopperSlice";
import Link from "next/link";
import { config } from "@/src/config/config";
import DashDivider from "./DashDivider";
import { OrderRequestPayload, PaymentInfo } from "@/src/types/types";

const CheckoutForm: React.FC = () => {
  const { actions, state, dispatch } = useShopper();
  const orders = state.orders.items;
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    email: "someone@someone",
    name: "someone",
    address: "Gotham,  Street 404",
    phone: "(+200) 91111111",
    cardNumber: "1111 1111 1111 1111",
    expirationDate: "11/1111",
    cvv: "1111",
  });

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  // order sumit
  const handleSubmitOrder = async () => {
    const res = await fetch(`${config.apiBaseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ orders, paymentInfo } as OrderRequestPayload),
    });
    if (!res.ok) return alert("order fail");

    dispatch(actions.setOrders([]));
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
                  sx={{ m: 1 }}
                >
                  <Typography fontSize={"20px"}>+</Typography>
                </Button>
                <Button
                  onClick={() => {
                    handleUpdateQuantity(product.id, quantity - 1);
                  }}
                  variant="contained"
                  color="secondary"
                  disabled={quantity === 1}
                  sx={{ m: 1 }}
                >
                  <Typography fontSize={"20px"}>-</Typography>
                </Button>
              </ButtonGroup>
            </ProductItem>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
        </Grid>{" "}
      </Grid>{" "}
      <DashDivider text="Order" />
      <Typography variant="h6" gutterBottom>
        Payment
      </Typography>
      <Grid item xs={12}>
        <TextField
          name="name"
          label="Name"
          value={paymentInfo.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />{" "}
        <TextField
          name="email"
          label="Email"
          value={paymentInfo.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />{" "}
        <TextField
          name="phone"
          label="Phone"
          value={paymentInfo.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />{" "}
        <TextField
          name="address"
          label="Address"
          value={paymentInfo.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {
          //
        }
        <TextField
          name="cardNumber"
          label="Card Number"
          value={paymentInfo.cardNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="expirationDate"
          label="Expiration Date"
          value={paymentInfo.expirationDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="cvv"
          label="CVV"
          value={paymentInfo.cvv}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleSubmitOrder}
          disabled={!orders.length}
          variant="contained"
          color="primary"
        >
          Place Order
        </Button>
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
