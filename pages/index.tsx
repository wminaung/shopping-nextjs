import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  const goProductsPage = async () => {
    await router.push("/products");
  };

  useEffect(() => {
    router.prefetch("/products");
  }, []);
  return (
    <Box>
      <Button variant="contained" onClick={goProductsPage}>
        go product page
      </Button>
    </Box>
  );
};

export default HomePage;
