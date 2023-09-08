// pages/register.tsx

import { useState } from "react";
import { Container, Typography, TextField, Button, Link } from "@mui/material";
import NextLink from "next/link";
import { config } from "@/src/config/config";
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = name && email && password;
    if (!valid) {
      return alert("hey waht r u doing");
    }

    const res = await fetch(`${config.apiBaseUrl}/customer/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      return alert("somethign wrong");
    }
    console.log(await res.json());
    // Implement your registration logic here (e.g., API request)
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
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
          Register
        </Button>
        <Link
          component={NextLink}
          href="/login"
          color="primary"
          variant="caption"
        >
          Go to Login
        </Link>
      </form>
    </Container>
  );
};

export default RegisterPage;
