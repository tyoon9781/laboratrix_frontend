<<<<<<< HEAD
import { UserView } from "@/app/types/auth";
import { guestUser } from "@/app/redux/slices/usersSlice";

export const Jwt2User = (token: string): UserView => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("[Error] Failed to decode JWT:", err);
    return guestUser;
  }
};

export const convDatetime = (dateString: string): string => {
  const date = new Date(dateString);

  // Adjust to UTC+9
  date.setHours(date.getHours() + 9);

  // Format the date and time
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const isIntString = (data: any): boolean => {
  if (typeof data !== "string") {
    return false;
  }
  return /^\d+$/.test(data);
=======
import { guest, UserState } from "@/app/redux/slices/userSlice";
import config from "@/app/config";

export const JWT2User = (token: string): UserState => {
  try {
    const base64URL = token.split(".")[1];
    const base64 = base64URL.replace("-", "+").replace("_", "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("[Error] failed to decode JWT", error);
    return guest;
  }
};

export const deleteToken = async () => {
  console.log("delete token");
  const res = await fetch(`${config.BACKEND_URL}/users/token`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (res.ok) {
    console.log("success delete cookie");
  } else {
    console.error("[Error] Failed delete cookie");
  }
>>>>>>> 6ff69093a62da3fb26d53868d25f9d6ba600b1cc
};
