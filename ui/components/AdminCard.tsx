import React, { memo } from "react";
import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";

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

import { navLinks } from "./AdminDrawer";
import { useRouter } from "next/router";

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
        m: 2,
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
        <Typography
          color={"primary.main"}
          variant="subtitle2"
          sx={{ textAlign: "center" }}
        >
          {name}
        </Typography>
      </Box>
    </Card>
  );
};

export default memo(AdminProductCard);
