import ShoppingCard from "@/ui/components/ShoppingCard";
import { Box, Stack } from "@mui/material";
import CatCheckbox from "@/ui/components/CatCheckbox";
import { motion } from "framer-motion";
import Head from "next/head";
import BaseLayout from "@/ui/components/BaseLayout";
import { useShopper } from "@/src/store/slices/shopperSlice";
import SearchAutoComplete from "@/ui/components/SearchAutoComplete";
import { config } from "@/src/config/config";
import { useSession } from "next-auth/react";

const ProductListsPage = () => {
  const {
    state: { catshow, products, categories, categoriesXProducts },
  } = useShopper();

  console.log(useSession());

  const showProductsBySearchText = (searchText: string) => {
    if (!searchText) return products;
  };

  const activeCategories = catshow.items.filter((item) => item.isChecked);

  const filteredCheckedCategoriesXProducts = categoriesXProducts.filter(
    (item) => {
      const activeCategoriesIds = activeCategories.map((item) => item.id);
      return activeCategoriesIds.includes(item.categoryId);
    }
  );
  const validProductsIds = filteredCheckedCategoriesXProducts.map(
    (item) => item.productId
  );

  const productsByCategory = products.filter((item) => {
    return validProductsIds.includes(item.id);
  });

  const handleAddToCart = async (productId: number) => {
    console.log("orderPID", productId);
    const res = await fetch(
      `${config.apiAdminUrl}/products/${productId}/order`
    );
    if (!res.ok) {
      return alert("somethign wrong");
    }

    const data = await res.json();
  };

  const showProducts = () => {
    if (activeCategories.length === 0) {
      return products;
    }
    return productsByCategory;
  };

  return (
    <>
      <Head>
        <title>Product List</title>
      </Head>
      <BaseLayout>
        <Stack direction={"row"} justifyContent="end" flexWrap="wrap">
          <Box mr={"auto"}>
            {/* <SearchAutoComplete searchText={"SD"} setSearchText={() => {}} /> */}
            {/* <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            /> */}
          </Box>
        </Stack>
        <Stack direction={"row"} justifyContent="space-between" width={"100%"}>
          <Stack ml={6}>
            <Box width={180}>
              <CatCheckbox />
            </Box>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent="space-everywhere"
            alignItems={"center"}
            width="100%"
            flexWrap="wrap"
            sx={{ p: 3 }}
          >
            {showProducts().map((product) => (
              <Box key={product.id} sx={{ mx: "auto", mb: 3 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <ShoppingCard
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                </motion.div>
              </Box>
            ))}
          </Stack>
        </Stack>
      </BaseLayout>
    </>
  );
};
export default ProductListsPage;

// export const getStaticProps: GetStaticProps = async () => {
//   const resProducts = await fetch("https://fakestoreapi.com/products");
//   const products = await resProducts.json();

//   const url = "https://fakestoreapi.com/products/categories";
//   const resCategories = await fetch(url);
//   const categories = await resCategories.json();

//   return {
//     props: {
//       products,
//       categories,
//     },
//   };
// };
