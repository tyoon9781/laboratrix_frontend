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
};
