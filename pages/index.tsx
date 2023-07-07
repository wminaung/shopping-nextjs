import { GetStaticProps } from "next";
import ShoppingCard from "@/ui/components/ShoppingCard";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import SearchAutoComplete from "@/ui/components/SearchAutoComplete";
import { Product } from "@/src/types/types";
import CatCheckbox from "@/ui/components/CatCheckbox";
import { motion } from "framer-motion";
import Loading from "@/ui/components/Loading";
import Head from "next/head";
import { useShopper } from "@/src/context/ShopperContextProvider";

const Home = () => {
  const { products, categories } = useShopper();

  const [checkCat, setCheckCat] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  const showProductsByCategory = (category: string) => {
    if (!category) return products;

    const productsByCategory = products.filter(
      (products) => products.category.toLowerCase() === category.toLowerCase()
    );

    return productsByCategory;
  };

  const showProductsBySearchText = (searchText: string) => {
    if (!searchText) return products;

    const productsBySearchText = products.filter((product) => {
      return product.title.toLowerCase().includes(searchText.toLowerCase());
    });

    return productsBySearchText;
  };

  const handleAddToCart = (id: number) => {};

  useEffect(() => {
    setLoading(false);
    setSearchText("");
  }, [checkCat]);

  return (
    <>
      <Head>
        <title>Product List</title>
      </Head>
      <Stack direction={"row"} justifyContent="end" flexWrap="wrap">
        <Box mr={"auto"} ml={31}>
          <SearchAutoComplete
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </Box>
      </Stack>
      <Stack direction={"row"} justifyContent="space-between" width={"100%"}>
        <Stack ml={6}>
          <Box width={180}>
            <CatCheckbox
              setLoading={setLoading}
              categories={categories}
              checkCat={checkCat}
              setCheckCat={setCheckCat}
            />
          </Box>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent="space-everywhere"
          alignItems={"center"}
          width="100%"
          flexWrap="wrap"
        >
          {(loading && (
            <>
              <Loading />
            </>
          )) ||
            (searchText &&
              showProductsBySearchText(searchText).map((product) => (
                <Box key={product.id} sx={{ mr: 4, mb: 4 }}>
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
              ))) ||
            showProductsByCategory(checkCat).map((product) => (
              <Box key={product.id} sx={{ mr: 4, mb: 4 }}>
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
    </>
  );
};
export default Home;

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
