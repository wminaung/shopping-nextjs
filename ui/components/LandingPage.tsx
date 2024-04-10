import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();
  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Our Website
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Explore our products and services.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          router.push("/products");
        }}
        color="primary"
      >
        Get Started
      </Button>
    </Container>
  );
};

export default LandingPage;
