import React, { useState } from "react";
import { TextField, Button, Container, Grid, FormControl } from "@mui/material";

import { Prisma } from "@prisma/client";
import { useAdmin } from "@/src/store/slices/adminSlice";
import FileDropzone from "../FileDropzone";

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

  const [file, setFile] = useState<File | null>(null);

  const {
    state: { products },
  } = useAdmin();

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
            <FormControl fullWidth>
              <TextField
                label="Product title"
                fullWidth
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {/* <TextField
              label="Category"
              fullWidth
              multiline
              name="category"
              value={"sdf"}
              onChange={handleInputChange}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Price"
                fullWidth
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                fullWidth
                multiline
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FileDropzone file={file} setFile={setFile} />
            </FormControl>
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
