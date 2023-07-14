import AdminLayout from "@/ui/components/AdminLayout";
import AdminProductCard from "@/ui/components/AdminProductCard";
import { useAdmin } from "@/src/context/AdminContextProvider";
import { Box, Stack } from "@mui/material";
import React from "react";
import DialogButton from "@/ui/components/DialogButton";
import CreateProduct, {
  defaultProductCreateInputValue,
} from "@/ui/components/products/CreateProduct";
import { Prisma } from "@prisma/client";
import { config } from "@/src/config/config";
import { getPostPutRequestInit } from "@/src/utils";
import { ValidationError } from "@/src/types/types";

const ProductsListPage = () => {
  const { products, fetchData } = useAdmin();
  if (!products) {
  }

  const createProduct = async (
    payload: Prisma.productCreateInput,
    setNewProduct: React.Dispatch<
      React.SetStateAction<Prisma.productCreateInput>
    >
  ) => {
    const res = await fetch(
      `${config.apiAdminUrl}/products`,
      getPostPutRequestInit("POST", payload)
    );

    if (!res.ok) {
      fetchData();
      if (res.status === 403) {
        const error = (await res.json()) as ValidationError;
        const alertContext = error.details.reduce(
          (prev, curr) => (prev += curr.message),
          ""
        );

        alert(alertContext);
        return;
      }

      return;
    }
    const resData = await res.json();
    console.log("resData", resData);
    setNewProduct(defaultProductCreateInputValue);
    fetchData();
  };

  return (
    <AdminLayout>
      <Stack>
        <Stack direction={"column"} alignItems={"end"} sx={{ mr: 5 }}>
          <DialogButton title="Create Product">
            <CreateProduct createProduct={createProduct} />
          </DialogButton>
        </Stack>
        <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"}>
          {products.map((product) => (
            <Box sx={{ mx: "auto" }} key={product.id}>
              <AdminProductCard product={product} />
            </Box>
          ))}
          C S
        </Stack>
        k
      </Stack>
    </AdminLayout>
  );
};

export default ProductsListPage;
