import { Product } from "@/src/types/types";
import { Box, Button, Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import { useState } from "react";
import ToggleSize from "@/ui/components/ToggleSize";

interface Props {
  data: Product;
  handleAddToCart: (id: number) => void;
}

const Product = ({
  data: { category, description, id, image, price, rating, title },
  handleAddToCart,
}: Props) => {
  const [size, setSize] = useState("S");

  return (
    <Box color={"black"} padding={6}>
      <Stack direction={"row"} spacing={10}>
        <Box minWidth={300}>
          <Image
            width={450}
            height={450}
            src={image || ""}
            alt={title.slice(0, 10)}
            placeholder="blur"
            blurDataURL="jpg"
          />
        </Box>
        <Box>
          <Typography variant="body2">{category}</Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography marginTop={8} variant="body1">
            {description}
          </Typography>
          <Typography marginTop={3} variant="body1">
            $ {price} per 1 item
          </Typography>
          {/************ */}
          <Stack spacing={3} direction="row">
            <ToggleSize setSize={setSize} size={size} />
          </Stack>{" "}
          <Stack spacing={3} direction="row">
            <Button
              onClick={() => {
                handleAddToCart(id);
              }}
              variant="contained"
            >
              Order
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Product;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params?.productId;

  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);

  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);

  const data = await res.json();

  return {
    paths: data.map((product: any) => ({
      params: { productId: product.id.toString() },
    })),
    fallback: false,
  };
};
