"use client";

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setItems } from "@/app/redux/slices/itemsSlice";
import { setUser } from "@/app/redux/slices/usersSlice";
import { initItemsPageSize } from "@/app/redux/slices/itemPaginatorSlice";
import NavBar from "@/app/components/navBar";
import ItemTableContainer from "@/app/components/itemTableContainer";
import { authAPI } from "@/app/api/auth";
import { itemsAPI } from "@/app/api/items";
import Loading from "@/app/components/loading";

export default function HomePage() {
  const dispatch = useDispatch();
  const itemsPage = useSelector((state: RootState) => state.itemsPage);

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isItemLoading, setIsItemLoading] = useState(true);

  const getWhoami = async () => {
    setIsUserLoading(true);
    try {
      const result = await authAPI.whoami();
      if (result.success) {
        dispatch(setUser(result.data));
      } else {
        document.cookie = "access_token=; Max-Age=0; path=/;";
        document.cookie = "csrftoken=; Max-Age=0; path=/;";
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
    setIsUserLoading(false);
  };

  const getItems = async () => {
    setIsItemLoading(true);
    try {
      const result = await itemsAPI.fetchItems(1);
      if (result.success) {
        const totalItemPage = Math.ceil(
          result.data.count / itemsPage.itemPageSize
        );
        dispatch(setItems(result.data.items));
        dispatch(initItemsPageSize(totalItemPage));
      } else {
        console.error("Failed to fetch items:", result.detail);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
    }
    setIsItemLoading(false);
  };

  useEffect(() => {
    getWhoami();
    getItems();
  }, []);

  if (isUserLoading || isItemLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <ItemTableContainer />
=======
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
>>>>>>> 6ff69093a62da3fb26d53868d25f9d6ba600b1cc
    </>
  );
}
