import { GetStaticProps } from "next";
import ShoppingCard from "@/components/ShoppingCard";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import SearchAutoComplete from "@/components/SearchAutoComplete";
import { Product } from "@/types/types";
import CatCheckbox from "@/components/CatCheckbox";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
import Head from "next/head";

interface Props {
  products: Array<Product>;
  categories: string[];

  handleAddToCart: (id: number) => void;
}

const Home = ({ products, categories, handleAddToCart }: Props) => {
  const [checkCat, setCheckCat] = useState<string>("");

  console.log("checkCat", checkCat);

  const [loading, setLoading] = useState(true);

  const showProductsByCategory = (category: string) => {
    if (!category) return products;

    const productsByCategory = products.filter(
      (products) => products.category.toLowerCase() === category.toLowerCase()
    );

    return productsByCategory;
  };

  useEffect(() => {
    setLoading(false);
  }, [checkCat]);

  return (
    <>
      <Head>
        <title>Product List</title>
      </Head>
      <Stack
        className="my-3 px-14"
        direction={"row"}
        justifyContent="end"
        flexWrap="wrap"
      >
        <SearchAutoComplete products={products} />
      </Stack>
      <Stack direction={"row"} justifyContent="space-between" width={"100%"}>
        <Stack ml={6}>
          <Box width={180} className="sticky top-28">
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
          justifyContent="center"
          alignItems={"center"}
          width="100%"
          flexWrap="wrap"
        >
          {(loading && (
            <>
              <Loading />
            </>
          )) ||
            showProductsByCategory(checkCat).map((product) => (
              <Box key={product.id}>
                <motion.div
                  className="m-2"
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

export const getStaticProps: GetStaticProps = async () => {
  const resProducts = await fetch("https://fakestoreapi.com/products");
  const products = await resProducts.json();

  const url = "https://fakestoreapi.com/products/categories";
  const resCategories = await fetch(url);
  const categories = await resCategories.json();

  return {
    props: {
      products,
      categories,
    },
  };
};
