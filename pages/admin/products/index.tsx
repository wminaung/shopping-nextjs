import AdminLayout from "@/ui/components/AdminLayout";
import AdminProductCard from "@/ui/components/AdminProductCard";
import { Box, Pagination, Stack } from "@mui/material";
import { memo, useEffect, useState } from "react";
import DialogButton from "@/ui/components/DialogButton";

import { useAdmin } from "@/src/store/slices/adminSlice";
import { motion } from "framer-motion";
import CreateProduct from "@/ui/components/products/CreateProduct";

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
            <Box
              key={product.id.toString()}
              component={motion.div}
              initial={{ opacity: 0.2, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,

                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
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
