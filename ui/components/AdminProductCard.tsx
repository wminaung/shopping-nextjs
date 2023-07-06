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
  product: product;
}
const AdminProductCard = ({ product }: Props) => {
  const { id, title, price, description, category, image, ratingId } = product;
  return (
    <Card
      sx={{ width: 244, height: 330, pt: 3, margin: 2, borderRadius: 3 }}
      elevation={6}
    >
      <CardActionArea LinkComponent={Link} href="/admin/products/create">
        {image && (
          <CardMedia
            component={"img"}
            alt={title}
            image={image}
            width={144}
            sx={{ width: 144, height: 200, m: "0 auto" }}
          />
        )}
        <CardContent>
          <StyledParagraph>{title}</StyledParagraph>

          <Typography variant="body2" color="text.secondary">
            Price: {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {category}
          </Typography>
          {ratingId && (
            <Typography variant="body2" color="text.secondary">
              Rating ID: {ratingId}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AdminProductCard;
