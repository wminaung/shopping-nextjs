import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import { Product } from "@prisma/client";
import { useShopper } from "@/src/store/slices/shopperSlice";
import { v4 } from "uuid";
interface Props {
  product: Product;
}

const ShoppingCard = ({ product }: Props) => {
  const { id: productId, title, price, image } = product;

  const {
    actions: { addOrder },
    state,
    dispatch,
  } = useShopper();

  const handleAddToCart = async () => {
    dispatch(addOrder({ id: v4(), productId }));
  };
  console.log(state.orders);

  return (
    <Card
      sx={{ maxWidth: 301, borderRadius: "10px", px: "5px" }}
      variant="outlined"
    >
      <div>
        <CardHeader title={title.slice(0, 15) + ".."} subheader={"subheader"} />
      </div>
      <div>
        <Link href={`/products/${productId}`}>
          <motion.div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            whileHover={{ opacity: 0.8, scale: 1.1 }}
          >
            {image ? (
              <Image
                src={image}
                width={258}
                height={258}
                alt="image"
                placeholder="blur"
                blurDataURL="jpg"
              />
            ) : (
              <Box
                sx={{
                  width: 258,
                  height: 258,
                  bgcolor: "gray",
                  opacity: 0.5,
                  position: "relative",
                }}
              >
                <Box
                  component={"span"}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 1,
                    fontFamily: "fantasy",
                    color: "red",
                  }}
                >
                  NO IMAGE
                </Box>
              </Box>
            )}
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
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
export default ShoppingCard;
