import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import ToggleSize from "@/ui/components/ToggleSize";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useAdmin } from "@/src/store/slices/adminSlice";
import { useShopper } from "@/src/store/slices/shopperSlice";
import Grid from "@mui/material/Grid";
// interface Props {
//   data: Product;
//   handleAddToCart: (id: number) => void;
// }

const ProductById = () => {
  const [size, setSize] = useState("S");
  const router = useRouter();
  const productId = router.query.productId as string;

  const {
    state: { products },
  } = useShopper();
  const product = products.filter((p) => String(p.id) === String(productId))[0];
  if (!product) return <div>Product is not in database</div>;
  const {
    id,
    image,
    title,
    price,
    createdAt,
    description,
    isArchive,
    updatedAt,
  } = product;

  const handleAddToCart = (id: number) => {};

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ mt: 5 }}
    >
      <Grid item xs={12} lg={6}>
        <Box sx={{}}>
          <Box minWidth={"450px"} textAlign={"center"}>
            <Image
              width={600}
              height={600}
              style={{ width: "500px", height: "auto" }}
              src={image || ""}
              alt={title.slice(0, 10)}
              placeholder="blur"
              blurDataURL="jpg"
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box sx={{ height: "100%" }}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { lg: "flex-start", xs: "center" },
            }}
          >
            <Typography variant="body2">{"category"}</Typography>
            <Typography variant="h5">{title}</Typography>
            <Typography marginTop={8} variant="body1">
              {description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              repudiandae dolor optio alias, at qui! Aut at expedita, ratione
              voluptates autem dolorum veritatis molestias saepe ducimus
              excepturi tenetur laborum quod.
            </Typography>
            <Typography marginTop={3} variant="body1">
              $ {price} per 1 item
            </Typography>
            {/************ */}
            <Stack spacing={3} mt={3} direction="row">
              <ToggleSize setSize={setSize} size={size} />
            </Stack>{" "}
            <Stack spacing={3} mt={3} direction="row">
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
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <Box color={"black"}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      ></Box>
    </Box>
  );
};

export default ProductById;

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const productId = params?.productId;

//   const res = await fetch(`https://fakestoreapi.com/products/${productId}`);

//   const data = await res.json();

//   return {
//     props: {
//       data: data,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`https://fakestoreapi.com/products`);

//   const data = await res.json();

//   return {
//     paths: data.map((product: any) => ({
//       params: { productId: product.id.toString() },
//     })),
//     fallback: false,
//   };
// };
