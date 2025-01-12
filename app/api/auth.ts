import { BACKEND_URL } from "@/app/config";
import { ResponseType } from "@/app/api/api";
import { AccessToken, CSRFToken, UserView } from "@/app/types/auth";

const authURL = `${BACKEND_URL}/auth`;

export const authAPI = {
  login: async (
    email: string,
    password: string
  ): Promise<ResponseType<AccessToken>> => {
    const res = await fetch(`${authURL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: new URLSearchParams({ username: email, password: password }),
    });

    const data = await res.json();

    if (res.ok) {
      // login success
      return {
        success: true,
        status: res.status,
        data: data,
      };
    }

    if (res.status === 401) {
      // login fail
      return {
        success: false,
        status: res.status,
        detail: data.detail,
      };
    }

    throw new Error(`Failed to Login. ${data}`);
  },

  getCSRFToken: async (): Promise<ResponseType<CSRFToken>> => {
    const res = await fetch(`${authURL}/csrftoken`, {
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        status: res.status,
        data: data,
      };
    }

    throw new Error("Failed to fetch CSRF token");
  },

  deleteToken: async (): Promise<ResponseType<null>> => {
    const res = await fetch(`${authURL}/token`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cookies: ["access_token", "csrftoken"] }),
      credentials: "include",
    });

    if (res.ok) {
      return {
        success: true,
        status: res.status,
        data: null,
      };
    }

    throw new Error("Failed to delete token");
  },

  whoami: async (): Promise<ResponseType<UserView>> => {
    const res = await fetch(`${authURL}/me`, {
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      // user found
      return {
        success: true,
        status: res.status,
        data: data,
      };
    } else {
      // guest
      return {
        success: false,
        status: res.status,
        detail: data,
      };
    }
  },
};
