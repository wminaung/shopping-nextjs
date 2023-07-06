import AdminLayout from "@/ui/components/AdminLayout";
import AdminProductCard from "@/ui/components/AdminProductCard";
import { useAdmin } from "@/src/context/AdminContextProvider";
import { Stack } from "@mui/material";
import React from "react";

const ProductsListPage = () => {
  const { products } = useAdmin();
  if (!products) {
  }
  return (
    <AdminLayout>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {products.map((product) => (
          <AdminProductCard product={product} key={product.id} />
        ))}
      </Stack>
    </AdminLayout>
  );
};

export default ProductsListPage;
