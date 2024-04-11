import ShoppingCard from "@/ui/components/ShoppingCard";
import { Box, Grid, Stack } from "@mui/material";
import CatCheckbox from "@/ui/components/CatCheckbox";
import { motion } from "framer-motion";
import Head from "next/head";
import BaseLayout from "@/ui/components/BaseLayout";
import { useShopper } from "@/src/store/slices/shopperSlice";
import SearchAutoComplete from "@/ui/components/SearchAutoComplete";
import { config } from "@/src/config/config";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import GridLayout from "@/ui/components/GridLayout";

const ProductListsPage = () => {
  const {
    state: {
      catshow,
      products,
      categories,
      categoriesXProducts,
      shopper: { productsToShow },
    },
    actions,
  } = useShopper();

  const [loading, setLoading] = useState(false);

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

  const showProducts = () => {
    if (activeCategories.length === 0) {
      return products;
    }

    return productsByCategory;
  };

  useEffect(() => {
    if (productsByCategory.length > 0)
      actions.setProductsToShow(productsByCategory);
    else actions.setProductsToShow(products);
  }, [productsByCategory]);

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

          <Box sx={{ pt: 2 }}>
            <GridLayout
              rowGap={2}
              columnGap={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {productsToShow.map((product) => (
                <Grid key={product.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ShoppingCard product={product} />
                  </motion.div>
                </Grid>
              ))}
            </GridLayout>
          </Box>

          {/* <Stack
            direction={"row"}
            justifyContent="space-everywhere"
            alignItems={"center"}
            width="100%"
            flexWrap="wrap"
            sx={{ m: 4 }}
          >
            {showProducts().map((product) => (
              <Box key={product.id} sx={{ mx: "auto", mb: 3 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <ShoppingCard product={product} />
                </motion.div>
              </Box>
            ))}
          </Stack> */}
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
