import { config } from "@/src/config/config";
import { useAdmin } from "@/src/store/slices/adminSlice";
import { getGetDeleteRequesInit, getPostPutRequestInit } from "@/src/utils";
import AdminLayout from "@/ui/components/AdminLayout";
import MultipleSelectChip from "@/ui/components/MultipleAutoCompleteChip";
import {
  Container,
  Grid,
  FormControl,
  TextField,
  Button,
  Typography,
  Card,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const defaultValue: Prisma.categoryUpdateInput = {
  name: "",
};
const UpdateCategoryByIdPage = () => {
  const [newCategory, setNewCategory] =
    useState<Prisma.categoryUpdateInput>(defaultValue);

  const router = useRouter();
  const { id: categoryId } = router.query;
  const {
    state: { categories },
    dispatch,
    actions,
  } = useAdmin();
  const category = categories.find((cat) => String(cat.id) === categoryId);
  useEffect(() => {
    if (category) {
      setNewCategory({ name: category.name });
    }
  }, [category]);

  if (!category) {
    return null;
  }

  const updateCategory = async () => {
    const isValid = category.name !== newCategory.name;

    if (!isValid) {
      return alert("not valid");
    }
    const payload = newCategory;

    console.log(payload);
    const res = await fetch(
      `${config.apiAdminUrl}/categories/${categoryId}`,
      getPostPutRequestInit<Prisma.categoryUpdateInput>("PUT", { ...payload })
    );

    if (!res.ok) {
      return alert("somethign wrong");
    }
    const updatedCategory = await res.json();

    dispatch(actions.updateCategory(updatedCategory));
  };

  const handleDelete = async () => {
    const isValid = confirm("Are you sure want to delete this item?");

    if (!isValid) {
      return;
    }

    const res = await fetch(
      `${config.apiAdminUrl}/categories/${categoryId}`,
      getGetDeleteRequesInit("DELETE")
    );

    if (!res.ok) {
      return alert("can not delete");
    }

    const deletedCategory = await res.json();
    dispatch(actions.deleteCategory(deletedCategory));

    await router.push("/admin/categories");
  };
  const isDisabled = category.name === newCategory.name;

  return (
    <AdminLayout title="Edit Category">
      <Container maxWidth="sm" component={Card} sx={{ px: 2, py: 5 }}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await updateCategory();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Edit Category</Typography>
            </Grid>

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
            {/* <Grid item xs={12}>
              <MultipleSelectChip />
            </Grid> */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="outlined"
                color="error"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isDisabled}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default UpdateCategoryByIdPage;
