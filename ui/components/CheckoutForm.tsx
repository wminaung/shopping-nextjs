import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { CartItem } from "@/src/types/types";
interface Props {
  setOrderItems: Dispatch<SetStateAction<CartItem[]>>;
}
const CheckoutForm = ({ setOrderItems }: Props) => {
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    setOrderItems([]);
    alert("Order Successfully !");
  };

  return (
    <React.Fragment>
      <Head>
        <title>Checkout | Ecommerce</title>
      </Head>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Checkout
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="First Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Address"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required label="City" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="State"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Postal Code"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Country"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="secondary" type="submit">
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default CheckoutForm;
