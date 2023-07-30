import { memo, useState } from "react";
import { TextField, Button, Container, Grid, FormControl } from "@mui/material";

import { Prisma } from "@prisma/client";
import { useAdmin } from "@/src/store/slices/adminSlice";
import FileDropzone from "../FileDropzone";
import { getPostPutRequestInit } from "@/src/utils";
import { config } from "@/src/config/config";
import { Api, ValidationError } from "@/src/types/types";
import { superbase } from "@/src/utils/superbase";
import { v4 as uuidv4 } from "uuid";

const defaultValue: Prisma.categoryCreateInput = {
  name: "",
};

const CreateProduct = () => {
  const [newCategory, setNewCategory] =
    useState<Prisma.categoryCreateInput>(defaultValue);

  const {
    state: { products },
    dispatch,
    actions,
  } = useAdmin();

  ////

  const createCategory = async () => {
    if (!newCategory.name) {
      return alert("name reuqired");
    }
    const payload: Prisma.categoryCreateInput = newCategory;

    const res = await fetch(
      `${config.apiAdminUrl}/categories`,
      getPostPutRequestInit<Prisma.categoryCreateInput>("POST", { ...payload })
    );

    if (!res.ok) {
      return alert("somethign wrong");
    }

    const category = await res.json();

    dispatch(actions.addCategory(category));
    setNewCategory(defaultValue);
  };

  const isDisabled = newCategory.name.trim().length === 0;
  ////

  return (
    <Container maxWidth="sm">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createCategory();
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Category Name"
                fullWidth
                name="title"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={isDisabled}
              variant="contained"
              color="primary"
              type="submit"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default memo(CreateProduct);
