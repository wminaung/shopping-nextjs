import React, { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styled from "@emotion/styled";
import { Box, Button, CardActionArea, CardActions, Chip } from "@mui/material";
import Link from "next/link";
import { useAdmin } from "@/src/store/slices/adminSlice";
import { Product } from "@prisma/client";

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
  return (
    <Card
      elevation={6}
      sx={{
        width: { md: 244, xs: 244 / 1.2 },
        margin: 2,
        borderRadius: 3,
        opacity: 0.8,
        ":hover": {
          opacity: 1,
        },
      }}
    >
      <CardActionArea
        LinkComponent={Link}
        href={`/admin/products/${product.id}`}
        sx={{
          width: { md: 244, xs: 244 / 1.2 },
          minHeight: { md: 330, xs: 330 / 1.2 },
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          textAlign: "start",
        }}
      >
        {product.image && (
          <CardMedia
            component={"img"}
            alt={product.title}
            image={product.image}
            sx={{
              width: { md: 144, sm: 144 / 1.2 },
              height: { md: 180, sm: 180 / 1.2 },
              m: "0 auto",
            }}
          />
        )}
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            mt: { md: 4, xs: 4 / 1.2 },
          }}
        >
          <StyledParagraph
            sx={{
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {product.title}
          </StyledParagraph>
          <Typography variant="caption" color="text.secondary">
            Price: {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(AdminProductCard);
