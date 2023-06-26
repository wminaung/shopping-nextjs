import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import ShopperLogo from "./ShopperLogo";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "grey.200", mt: 20, py: 12 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              gravida libero vel dolor commodo, ut tristique nibh laoreet.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <ul>
              <li>
                {" "}
                <Link href="/" color="text.primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" color="text.primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" color="text.primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" color="text.primary">
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" gutterBottom>
              Email: minwin243@gmail.com
            </Typography>{" "}
            <ShopperLogo />
          </Grid>
        </Grid>{" "}
      </Container>
    </Box>
  );
};

export default Footer;
