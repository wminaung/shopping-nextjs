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
import { Prisma } from "@prisma/client";

export const defaultProductCreateInputValue: Prisma.productCreateInput = {
  title: "",
  description: "",
  price: 0,
  image: "",
};

interface Props {
  createProduct: (
    payload: Prisma.productCreateInput,
    setNewProduct: React.Dispatch<
      React.SetStateAction<Prisma.productCreateInput>
    >
  ) => Promise<void>;
}
const CreateProduct = ({ createProduct }: Props) => {
  const [newProduct, setNewProduct] = useState<Prisma.productCreateInput>(
    defaultProductCreateInputValue
  );

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

  return (
    <Container maxWidth="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProduct(newProduct, setNewProduct);
        }}
      >
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
            {/* <TextField
              label="Category"
              fullWidth
              multiline
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
            /> */}
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
  );
};

export default CreateProduct;
