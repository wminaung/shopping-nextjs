import { memo, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  FormControl,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import { Category, Prisma, Product } from "@prisma/client";
import { useAdmin } from "@/src/store/slices/adminSlice";
import FileDropzone from "../FileDropzone";
import { getPostPutRequestInit } from "@/src/utils";
import { config } from "@/src/config/config";
import { Api } from "@/src/types/types";
import { superbase } from "@/src/utils/superbase";
import { v4 as uuidv4 } from "uuid";
import MultipleAutoCompleteChip from "../MultipleAutoCompleteChip";
import { ValidationError } from "joi";

export const defaultProductCreateInputValue: Prisma.ProductCreateInput = {
  title: "",
  description: "",
  price: 0,
  image: "",
};

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState<Prisma.ProductCreateInput>(
    defaultProductCreateInputValue
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    state: { categories },
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

  const createProduct = async () => {
    // TODO - image upload
    const payload = { ...newProduct, selectedCategories };
    const isValid =
      payload.title &&
      payload.price >= 0 &&
      payload.description &&
      selectedCategories.length > 0;

    if (!file || !isValid) {
      return alert("Image is needed or some field missing");
    }

    const image = `https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg`;

    const res = await fetch(
      `${config.apiAdminUrl}/products`,
      getPostPutRequestInit<Prisma.ProductCreateInput>("POST", {
        ...payload,
        image: image,
      })
    );

    if (!res.ok) {
      return alert(`something wrong : ${JSON.stringify(res.statusText)}`);
    }
    const product = (await res.json()) as Product;

    dispatch(actions.addProduct(product));
    //todo dispathc catxproduct

    setNewProduct(defaultProductCreateInputValue);
    setSelectedCategories([]);
    // fetchData();
  };

  const handleSelectedCategories = async (
    event: React.SyntheticEvent<Element, Event>,
    value: Category[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Category> | undefined
  ) => {
    setSelectedCategories(value);
  };

  ////

  return (
    <Container maxWidth="sm">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createProduct();
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
            <MultipleAutoCompleteChip
              categories={categories}
              selectedCategories={selectedCategories}
              handleSelectedCategories={handleSelectedCategories}
            />
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
            <Button variant="outlined" color="primary" type="submit">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default memo(CreateProduct);
