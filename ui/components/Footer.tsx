import React, { useEffect, useState } from "react";
import { Container, Typography, Link, Box } from "@mui/material";
import ShopperLogo from "./ShopperLogo";
import { config } from "@/src/config/config";

const Footer = () => {
  const [host, setHost] = useState("something");

  useEffect(() => {
    window?.location?.host && setHost(window?.location?.host);
  }, []);

  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="white"
      py={4}
      sx={{ position: "relative", bottom: 0 }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          <ShopperLogo />
        </Typography>

        <Typography variant="subtitle1" align="center" component="p">
          Welcome to Shopper's website. Explore my work.
        </Typography>
        <Typography variant="body2" align="center">
          <Link color="inherit" href="#">
            Link 1
          </Link>{" "}
          |{" "}
          <Link color="inherit" href="#">
            Link 2
          </Link>{" "}
          |{" "}
          <Link color="inherit" href="#">
            Link 3
          </Link>
        </Typography>
        <Typography variant="body2" align="center" mt={2}>
          &copy; {new Date().getFullYear()} Your {host}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
