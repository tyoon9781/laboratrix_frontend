"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/slices/usersSlice";
import { Jwt2User } from "@/app/utils";
import { authAPI } from "@/app/api/auth";

export default function LoginPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect") || "/";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await authAPI.login(email, password);
      if (result.success) {
        const userData = Jwt2User(result.data.access_token);
        dispatch(setUser(userData));
        router.push(redirectURL);
      } else {
        console.error(result.detail);
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("[Error]", err);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 8, mx: "auto", width: 400 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ m: 1 }}
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ m: 1 }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
