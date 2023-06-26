import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";

import { Button, Stack } from "@mui/material";
import Link from "next/link";

import { Product } from "@/types/types";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  handleAddToCart: (id: number) => void;
}

const ShoppingCard = ({
  product: { id, title, category, image, price },
  handleAddToCart,
}: Props) => {
  return (
    <Card
      sx={{ maxWidth: 301, borderRadius: "10px", px: "5px" }}
      variant="outlined"
    >
      <div>
        <CardHeader title={title.slice(0, 15) + ".."} subheader={category} />
      </div>
      <div>
        <Link href={`/products/${id}`}>
          <motion.div whileHover={{ opacity: 0.8, scale: 1.1 }}>
            <Image
              src={image}
              width={258}
              height={258}
              alt="image"
              placeholder="blur"
              blurDataURL="jpg"
            />
          </motion.div>
        </Link>
      </div>
      <CardActions disableSpacing>
        <Stack
          justifyContent="space-between"
          alignItems={"center"}
          width={"100%"}
          direction="row"
        >
          <Typography variant="h6" color="text.primary">
            $ {price}
          </Typography>

          <Button
            variant="contained"
            size="small"
            sx={{ bgcolor: "black !important" }}
            onClick={() => handleAddToCart(id)}
          >
            Add to cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
export default ShoppingCard;
