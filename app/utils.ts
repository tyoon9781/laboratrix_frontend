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
};
