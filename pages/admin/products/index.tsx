import AdminLayout from "@/ui/components/AdminLayout";
import AdminProductCard from "@/ui/components/AdminProductCard";
import { Box, Pagination, Stack } from "@mui/material";
import { memo, useEffect, useState } from "react";
import DialogButton from "@/ui/components/DialogButton";
import CreateProduct from "@/ui/components/products/CreateProduct";
import { useAdmin } from "@/src/store/slices/adminSlice";

const ProductsListPage = () => {
  const {
    state: { products, pagination },
    actions,
    dispatch,
  } = useAdmin();
  const {
    products: { currentPage, endIndex, itemsPerPage, startIndex },
  } = pagination;

  const showProducts = products.slice(startIndex, endIndex);
  useEffect(function () {
    console.count("ll");
  });
  return (
    <AdminLayout title="Products">
      <Stack>
        <Stack direction={"column"} alignItems={"end"} sx={{ mr: 5 }}>
          <DialogButton title="Create Product">
            <CreateProduct />
          </DialogButton>
        </Stack>

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {showProducts.map((product) => (
            <Box key={product.id}>
              <AdminProductCard product={product} />
            </Box>
          ))}
        </Stack>

        <Stack alignItems={"center"}>
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={currentPage}
            showFirstButton
            showLastButton
            onChange={(e, p) => {
              dispatch(
                actions.setProductPaination({
                  currentPage: p,
                  itemsPerPage: itemsPerPage,
                })
              );
            }}
          />
        </Stack>
      </Stack>
    </AdminLayout>
  );
};

export default ProductsListPage;
