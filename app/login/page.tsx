"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import config from "@/app/config";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/slices/userSlice";
import { JWT2User } from "@/app/utils";

type JWTCookie = {
  access_token: string;
  token_type: string;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", email);
      params.append("password", password);
      params.append("scope", "");
      params.append("client_id", "string");
      params.append("client_secret", "string");

      const response = await fetch(`${config.BACKEND_URL}/users/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        credentials: "include", // To include credentials (cookies)
      });

      if (response.ok) {
        const jwtCookie: JWTCookie = await response.json();
        const userData = JWT2User(jwtCookie.access_token);
        dispatch(setUser(userData));
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error(`[Error] ${err}`);
      setError("Invalid Email or password");
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
              sx={{ mt: 2 }}
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
