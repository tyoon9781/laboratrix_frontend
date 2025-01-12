"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
<<<<<<< HEAD
import { store } from "./redux/store";
=======
import { store } from "@/app/redux/store";
>>>>>>> 6ff69093a62da3fb26d53868d25f9d6ba600b1cc
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
<<<<<<< HEAD
    document.title = "Mple";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", "Mple notice board");
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = "Mple notice board";
      document.head.appendChild(newMetaDescription);
    }
  }, []);

=======
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
>>>>>>> 6ff69093a62da3fb26d53868d25f9d6ba600b1cc
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
