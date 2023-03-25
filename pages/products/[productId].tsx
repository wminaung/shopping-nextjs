import { Product } from "@/types/types";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import ToggleSize from "@/components/ToggleSize";

interface Props {
  data: Product;
}

const Product = ({
  data: { category, description, id, image, price, rating, title },
}: Props) => {
  const [size, setSize] = useState("S");

  const router = useRouter();
  const { productId } = router.query;

  console.log(size);
  return (
    <Box color={"black"} padding={6}>
      <Box className="py-8"></Box>
      <Stack
        direction={"row"}
        spacing={10}
        className="flex-wrap md:flex-nowrap"
      >
        <Box minWidth={300}>
          <Image
            width={450}
            height={450}
            src={image}
            className="rounded-lg"
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
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const { productId } = query;

  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
