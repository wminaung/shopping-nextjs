// pages/login.tsx

import { useState } from "react";
import { Container, Typography, TextField, Button, Link } from "@mui/material";
import NextLink from "next/link";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Implement your authentication logic here (e.g., API request)

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mb: 2 }}
        >
          Login
        </Button>
        <Link
          component={NextLink}
          href="/register"
          color="primary"
          variant="caption"
        >
          Go to Register
        </Link>
      </form>
    </Container>
  );
};

export default LoginPage;
