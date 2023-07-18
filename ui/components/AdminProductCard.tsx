import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { product } from "@prisma/client";
import Image from "next/image";
import styled from "@emotion/styled";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";
import { Product } from "@/src/types/types";
import { useAdmin } from "@/src/store/slices/adminSlice";

const StyledParagraph = styled(Typography)(({ theme }) => ({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: 300 /* Adjust as needed */,
  opacity: 1,
  transition: "opacity 0.3s ease",
  "&:hover": {
    opacity: 0.7,
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&::after:hover": {
      opacity: 1,
    },
  },
}));

interface Props {
  product: Product;
}
const AdminProductCard = ({ product }: Props) => {
  // const { title, price, description, categories, rating, image } = product;
  const {
    state: { categories, ratings, categoriesXProducts },
  } = useAdmin();

  const categoriesText = categories.reduce(
    (prev, curr) =>
      (prev += curr.name + `${categories.length > 1 ? ", " : ""}`),
    ""
  );

  return (
    <Card
      sx={{
        width: { md: 244, xs: 244 / 1.2 },
        height: { md: 330, xs: 330 / 1.2 },
        pt: 3,
        margin: 2,
        borderRadius: 3,
      }}
      elevation={6}
    >
      <CardActionArea LinkComponent={Link} href="/admin/products/create">
        {product.image && (
          <CardMedia
            component={"img"}
            alt={product.title}
            image={product.image}
            sx={{
              width: { md: 144, sm: 144 / 1.2 },
              height: { md: 200, sm: 200 / 1.2 },
              m: "0 auto",
            }}
          />
        )}
        <CardContent>
          <StyledParagraph>{product.title}</StyledParagraph>

          <Typography variant="body2" color="text.secondary">
            Price: {product.price}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Category: {categoriesText}
          </Typography>
          {/* {ratingId && (
            <Typography variant="body2" color="text.secondary">
              Rating ID: {ratingId}
            </Typography>
          )} */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AdminProductCard;
