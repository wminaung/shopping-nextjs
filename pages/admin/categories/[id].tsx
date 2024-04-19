import { config } from "@/src/config/config";
import { useAdmin } from "@/src/store/slices/adminSlice";
import { getGetDeleteRequesInit, getPostPutRequestInit } from "@/src/utils";
import { theme } from "@/src/utils/theme";
import AdminLayout from "@/ui/components/AdminLayout";
import AdminProductCard from "@/ui/components/AdminProductCard";
import DashDivider from "@/ui/components/DashDivider";
import MultipleSelectChip from "@/ui/components/MultipleAutoCompleteChip";
import {
  Container,
  Grid,
  FormControl,
  TextField,
  Button,
  Typography,
  Card,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const defaultValue: Prisma.CategoryUpdateInput = {
  name: "",
};
const UpdateCategoryByIdPage = () => {
  const [newCategory, setNewCategory] =
    useState<Prisma.CategoryUpdateInput>(defaultValue);

  const router = useRouter();
  const { id: categoryId } = router.query;
  const {
    state: { categories, products, categoriesXProducts },
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

  const catXProductIds = categoriesXProducts
    .filter((cxp) => String(cxp.categoryId) === String(categoryId))
    .map((cxt) => cxt.productId);
  const validProducts = products.filter((product) =>
    catXProductIds.includes(product.id)
  );

  const updateCategory = async () => {
    const isValid = category.name !== newCategory.name;

    if (!isValid) {
      return alert("not valid");
    }
    const payload = newCategory;

    const res = await fetch(
      `${config.apiAdminUrl}/categories/${categoryId}`,
      getPostPutRequestInit<Prisma.CategoryUpdateInput>("PUT", { ...payload })
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
      {/* <Divider orientation="horizontal" sx={{ mt: 3 }} /> */}
      <>
        <DashDivider text="Products" />
      </>
      <Stack
        bgcolor={theme.palette.mode}
        direction={"row"}
        mt={5}
        flexWrap={"wrap"}
      >
        {validProducts.map((product) => (
          <Box mx={"auto"} key={product.id}>
            <AdminProductCard product={product} key={product.id} />
          </Box>
        ))}
      </Stack>
    </AdminLayout>
  );
};

export default UpdateCategoryByIdPage;
