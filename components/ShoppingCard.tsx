import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Product } from "@/types/types";
import Image from "next/image";
import { memo } from "react";

interface Props {
  product: Product;
}

const ShoppingCard = ({
  product: { id, title, category, image, price },
}: Props) => {
  return (
    <Card
      sx={{ maxWidth: 301, borderRadius: "10px", px: "5px" }}
      variant="outlined"
    >
      <div className="">
        <CardHeader title={title.slice(0, 15) + ".."} subheader={category} />
      </div>
      <div className="w-full h-72 overflow-hidden flex justify-center items-center">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            width={258}
            height={258}
            alt="image"
            className="w-auto h-auto"
            placeholder="blur"
            blurDataURL="jpg"
          />
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
          >
            Add to cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
export default memo(ShoppingCard);
