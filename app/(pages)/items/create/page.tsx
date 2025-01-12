"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Box, TextField, Button, Typography } from "@mui/material";
import NavBar from "@/app/component/navBar";
import { authAPI } from "@/app/api/auth";
import { itemsAPI } from "@/app/api/items";

export default function CreateItemPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [csrftoken, setCSRFToken] = useState<string>("");
  const user = useSelector((state: RootState) => state.user);
  const user_id = user.id;

  // guest
  if (user_id === 0) {
    router.push("/login?redirect=/items/create");
  }

  const fetchCSRFToken = async () => {
    try {
      const result = await authAPI.getCSRFToken();
      if (result.success) {
        setCSRFToken(result.data.id);
      }
    } catch (err) {
      console.error("[Error]", err);
    }
  };

  useEffect(() => {
    fetchCSRFToken();
  }, []);

  const submitItem = async () => {
    try {
      const res = await itemsAPI.submitItem(csrfToken, {
        user_id,
        title,
        contents,
      });
      if (res.success) {
        router.push(`/items/${res.data.id}`);
      } else {
        throw new Error("Failed to create item");
      }
    } catch (err) {
      console.error("Error while creating item", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지, 비동기 요청 처리

    if (title.trim() === "" || contents.trim() === "") {
      alert("제목, 내용은 비울 수 없습니다.");
      return;
    }

    submitItem();
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <>
      <NavBar />
      <Box component="form" onSubmit={handleSubmit} sx={{ m: 4 }}>
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Title</Typography>
          <TextField
            label="title"
            variant="outlined"
            margin="normal"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Contents</Typography>
          <TextField
            label="Contents"
            variant="outlined"
            margin="normal"
            fullWidth
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}
