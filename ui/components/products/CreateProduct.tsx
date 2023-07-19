import React, { memo, useState } from "react";
import { TextField, Button, Container, Grid, FormControl } from "@mui/material";

import { Prisma } from "@prisma/client";
import { useAdmin } from "@/src/store/slices/adminSlice";
import FileDropzone from "../FileDropzone";
import { getPostPutRequestInit } from "@/src/utils";
import { config } from "@/src/config/config";
import { Api, ValidationError } from "@/src/types/types";
import { superbase } from "@/src/utils/superbase";
import { v4 as uuidv4 } from "uuid";

export const defaultProductCreateInputValue: Prisma.productCreateInput = {
  title: "",
  description: "",
  price: 0,
  image: "",
};

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState<Prisma.productCreateInput>(
    defaultProductCreateInputValue
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    state: { products },
    dispatch,
    actions,
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

  const createProduct = async (
    payload: Prisma.productCreateInput,
    setNewProduct: React.Dispatch<
      React.SetStateAction<Prisma.productCreateInput>
    >
  ) => {
    // TODO - image upload
    const isValid = payload.title && payload.price >= 0 && payload.description;
    if (!file || !isValid) {
      return alert("Image is needed or some field missing");
    }
    const { data, error } = await superbase.storage
      .from("winimg")
      .upload(`admin/products/${uuidv4()}-${file.name}`, file);

    if (error) {
      return;
    }
    const { path: imagePath } = data;

    const image = `${config.baseImageUrl}/${imagePath}`;
    console.log(image, "iamge");

    const res = await fetch(
      `${config.apiAdminUrl}/products`,
      getPostPutRequestInit<Prisma.productCreateInput>("POST", {
        ...payload,
        image: image,
      })
    );

    if (!res.ok) {
      if (res.status === 403) {
        const error = (await res.json()) as ValidationError;
        const alertContext = error.details.reduce(
          (prev, curr) => (prev += curr.message),
          ""
        );

        alert(alertContext);
        return;
      }
      alert("status : " + res.status);
      return;
    }
    const resData = await res.json();
    const { product } = resData as Api.Admin.Product.POST.ResponseData;
    dispatch(actions.addProduct(product));
    setNewProduct(defaultProductCreateInputValue);
    // fetchData();
  };

  ////

  return (
    <Container maxWidth="sm">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createProduct(newProduct, setNewProduct);
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
              <FileDropzone
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                file={file}
                setFile={setFile}
              />
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

export default memo(CreateProduct);
