import { GetServerSideProps, GetStaticProps } from "next";
import ShoppingCard from "@/components/ShoppingCard";
import { memo, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SearchAutoComplete from "@/components/SearchAutoComplete";
import { CategoryCheck, Product } from "@/types/types";
import CatCheckbox from "@/components/CatCheckbox";
import { motion } from "framer-motion";

const Home = ({ data, cart }: any) => {
  console.log(cart);
  const [products, setProducts] = useState<Product[]>(data);

  const [categories, setCategories] = useState<string[]>([] as string[]);

  const [checkCat, setCheckCat] = useState<string>("");

  // const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  const fetchCategories = async () => {
    const url = "https://fakestoreapi.com/products/categories";
    const res = await fetch(url);
    const data = await res.json();
    setCategories(data);
  };

  const fetchProducts = async () => {
    const url = `https://fakestoreapi.com/products/`;
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };
  const fetchProductsWithCategory = async (categoryName: string) => {
    console.log(categoryName);
    const url = `https://fakestoreapi.com/products/category/${categoryName}`;
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data ? data : []);
  };

  useEffect(() => {
    if (!checkCat) {
      fetchProducts();
    } else {
      fetchProductsWithCategory(checkCat);
    }
  }, [checkCat]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {" "}
      <Box className="py-8 "></Box>
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
              categories={categories}
              checkCat={checkCat}
              setCheckCat={setCheckCat}
            />
          </Box>
        </Stack>
        <Stack direction={"row"} justifyContent="center" flexWrap="wrap">
          {products.map((product) => (
            <Box key={product.id}>
              <motion.div
                className="m-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <ShoppingCard product={product} />
              </motion.div>
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
