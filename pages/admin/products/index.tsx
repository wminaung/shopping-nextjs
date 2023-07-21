import AdminLayout from "@/ui/components/AdminLayout";
import AdminProductCard from "@/ui/components/AdminProductCard";
import { Box, Stack } from "@mui/material";
import React from "react";
import DialogButton from "@/ui/components/DialogButton";
import CreateProduct from "@/ui/components/products/CreateProduct";
import { useAdmin } from "@/src/store/slices/adminSlice";

const ProductsListPage = () => {
  const {
    state: { products },
    actions,
    dispatch,
  } = useAdmin();

  return (
    <AdminLayout title="Products">
      <Stack>
        <Stack direction={"column"} alignItems={"end"} sx={{ mr: 5, mt: 8 }}>
          <DialogButton title="Create Product">
            <CreateProduct />
          </DialogButton>
        </Stack>
        <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"}>
          {products.map((product) => (
            <Box sx={{ mx: "auto" }} key={product.id}>
              <AdminProductCard product={product} />
            </Box>
          ))}
        </Stack>
      </Stack>
    </AdminLayout>
  );
};

export default ProductsListPage;
