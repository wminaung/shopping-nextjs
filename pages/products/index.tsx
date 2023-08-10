import ShoppingCard from "@/ui/components/ShoppingCard";
import { Box, Stack } from "@mui/material";
import CatCheckbox from "@/ui/components/CatCheckbox";
import { motion } from "framer-motion";
import Head from "next/head";
import BaseLayout from "@/ui/components/BaseLayout";
import { useShopper } from "@/src/store/slices/shopperSlice";

const ProductListsPage = () => {
  const {
    state: { products, categories, categoriesXProducts },
  } = useShopper();

  // const showProductsByCategories = () => {
  //   const catIdsToshow = catsToShow
  //     .filter((cat) => cat.isChecked)
  //     .map((cat) => cat.id);

  //   if (!catIdsToshow.length) {
  //     return products;
  //   }

  //   return products.filter((product) =>
  //     product.categories.find((category) => catIdsToshow.includes(category.id))
  //   );
  // };
  // console.log(showProductsByCategories(), "Show Prod");
  const showProductsBySearchText = (searchText: string) => {
    if (!searchText) return products;
  };

  const handleAddToCart = (id: number) => {};

  return (
    <>
      <Head>
        <title>Product List</title>
      </Head>
      <BaseLayout>
        <Stack direction={"row"} justifyContent="end" flexWrap="wrap">
          <Box mr={"auto"}>
            {/* <SearchAutoComplete
            searchText={"SD"}
            setSearchText={"setSearchText"}
          /> */}
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
            {products.map((product) => (
              <Box key={product.id} sx={{ mx: "auto", mb: 3 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  ss
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
