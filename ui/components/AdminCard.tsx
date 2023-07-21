import React, { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { product } from "@prisma/client";
import Image from "next/image";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Divider,
  Stack,
  SvgIconTypeMap,
} from "@mui/material";
import Link from "next/link";
import { Product } from "@/src/types/types";
import { useAdmin } from "@/src/store/slices/adminSlice";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { navLinks } from "./AdminDrawer";
import { useRouter } from "next/router";

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

type NavObject = {
  id: number;
  name: string;
  url: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

interface Props {
  name: string;
  href: string;
}
const AdminProductCard = ({ name, href }: Props) => {
  const router = useRouter();
  const nav = navLinks.find((nav) => nav.url === router.route);
  if (!nav) {
    return null;
  }
  const NavIcon = nav.icon;

  return (
    <Card
      sx={{
        width: { md: 200, xs: 200 / 1.2 },
        height: { md: 144, xs: 144 / 1.2 },
        margin: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
      elevation={6}
    >
      <CardActionArea
        sx={{
          height: { md: 100, xs: 100 / 1.2 },
          display: "flex",
        }}
        LinkComponent={Link}
        href={href}
      >
        <NavIcon color="secondary" fontSize={"large"} />
      </CardActionArea>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
          {name}
        </Typography>
      </Box>
    </Card>
  );
};

export default memo(AdminProductCard);
