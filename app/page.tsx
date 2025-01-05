"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "./redux/slices/itemSlice";
import { setUser } from "./redux/slices/userSlice";
import { CircularProgress } from "@mui/material";
import config from "./config";
import NavBar from "./component/navBar";
import ItemTable from "./component/itemTable";

const fetchItems = async () => {
  const res = await fetch(`${config.BACKEND_URL}/items`);
  if (!res.ok) {
    throw new Error("failed to fetch item");
  }
  return res.json();
};

const getCurrentUser = async () => {
  const res = await fetch(`${config.BACKEND_URL}/users/me`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("[Error] Failed to user info");
  }
  return res.json();
};

export default function Home() {
  const dispatch = useDispatch();
  const [isUserLoading, setUserLoading] = useState<boolean>(true);
  const [isItemLoading, setItemLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUserLoading(false);
      });
    fetchItems()
      .then((data) => {
        dispatch(setItems(data));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setItemLoading(false);
      });
  }, [dispatch]);

  if (isUserLoading || isItemLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <NavBar />
      <ItemTable />
    </>
  );
}
