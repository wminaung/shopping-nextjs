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
      categoriesXProducts,
      shopper: { productsToShow, shopperInit },
    },
    actions,
    dispatch,
  } = useShopper();

  const activeCategories = catshow.items.filter((item) => item.isChecked);

  useEffect(() => {
    if (!shopperInit) return;

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
    if (activeCategories.length === 0) {
      dispatch(actions.setProductsToShow(products));
    } else {
      dispatch(actions.setProductsToShow(productsByCategory));
    }
  }, [shopperInit, catshow]);

  return (
    <>
      <Head>
        <title>Product List</title>
      </Head>
      <BaseLayout>
        <Stack direction={"row"} justifyContent="end" flexWrap="wrap">
          <Box mr={"auto"}></Box>
        </Stack>
        <Stack direction={"row"} justifyContent="space-between" width={"100%"}>
          <Stack ml={6}>
            <Box width={180}>
              <CatCheckbox />
            </Box>
          </Stack>
          <GridLayout container rowGap={2} columnGap={1} sx={{}}>
            {productsToShow.map((product) => (
              <Grid
                item
                key={product.id + activeCategories.join("-")}
                xs={11}
                sm={11}
                md={5}
                lg={3}
                xl={2}
                // sx={{ border: "1px solid blue" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  {" "}
                  <ShoppingCard product={product} />
                </motion.div>
              </Grid>
            ))}
          </GridLayout>
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

/* <Grid
                  item
                  key={product.id.toString()}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                >
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
                </Grid>*/
