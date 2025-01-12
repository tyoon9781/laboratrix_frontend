"use client";

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
    </>
  );
}
