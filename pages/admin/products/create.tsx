import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import AdminLayout from "@/ui/components/AdminLayout";
import { NewProduct, Product, ValidationError } from "@/src/types/types";
import { useAdmin } from "@/src/context/AdminContextProvider";
import Link from "next/link";
import { config } from "@/src/config/config";
import { getPostPutRequesInit } from "@/src/utils";

const defaultValue = {
  title: "",
  description: "",
  category: "",
  price: 0,
};
const ProductCreatePage = () => {
  const [newProduct, setNewProduct] = useState<NewProduct>(defaultValue);

  const { products, fetchData } = useAdmin();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const isPrice = name === "price";
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: isPrice ? Number(value) : value,
    }));
  };

  ////

  ////

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = newProduct;
    const res = await fetch(
      `${config.apiAdminUrl}/products`,
      getPostPutRequesInit("POST", payload)
    );

    if (!res.ok) {
      fetchData();
      if (res.status === 403) {
        const error = (await res.json()) as ValidationError;
        const alertContext = error.details.reduce(
          (prev, curr) => (prev += curr.message),
          ""
        );

        alert(alertContext);
        return;
      }

      return;
    }
    const resData = await res.json();
    console.log("resData", resData);
    setNewProduct(defaultValue);
    fetchData();
  };

  return (
    <AdminLayout>
      <Container maxWidth="sm" component={Paper} elevation={3} sx={{ py: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product title"
                fullWidth
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                fullWidth
                multiline
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                fullWidth
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default ProductCreatePage;
