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

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutForm: React.FC = () => {
  const { actions, state } = useShopper();

  const [order, setOrder] = useState<Product[]>([
    { id: 1, name: "Product 1", price: 19.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 29.99, quantity: 2 },
  ]);

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    const updatedOrder = order.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setOrder(updatedOrder);
  };

  const handleRemoveProduct = (productId: number) => {
    const updatedOrder = order.filter((item) => item.id !== productId);
    setOrder(updatedOrder);
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {order.map((product) => (
          <Grid item xs={12} key={product.id}>
            <ProductItem>
              <Typography variant="body1">
                {product.name} - ${product.price.toFixed(2)} - Quantity:{" "}
                {product.quantity}
                <StyledIconButton
                  onClick={() => handleRemoveProduct(product.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </StyledIconButton>
              </Typography>
              <ButtonGroup>
                <Button
                  onClick={() =>
                    handleUpdateQuantity(product.id, product.quantity + 1)
                  }
                  variant="contained"
                  color="primary"
                >
                  +
                </Button>
                <Button
                  onClick={() =>
                    handleUpdateQuantity(product.id, product.quantity - 1)
                  }
                  variant="contained"
                  color="secondary"
                  disabled={product.quantity === 1}
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
