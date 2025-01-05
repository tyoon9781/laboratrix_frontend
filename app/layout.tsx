"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    document.title = "Laboratrix";
    const metaDescription = document.querySelector("meta[name='descroption']");
    if (metaDescription) {
      metaDescription.setAttribute("content", "Laboratrix - notice board");
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "lab";
      newMetaDescription.content = "notice board";
      document.head.appendChild(newMetaDescription);
    }
  }, []);
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
