import { BACKEND_URL } from "@/app/config";
import { ResponseType } from "@/api";
import { ItemsView, Item, PostItem } from "@/app/types/items";

const itemsURL = `${BACKEND_URL}/items`;

export const itemsAPI = {
  fetchItems: async (page: number): Promise<ResponseType<ItemsView>> => {
    const res = await fetch(`${itemsURL}?currPage=${page}&size=10`);
    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        status: res.status,
        data: data,
      };
    }
    throw new Error("Failed to fetch items");
  },

  fetchItem: async (id: string): Promise<ResponseType<Item>> => {
    const res = await fetch(`${itemsURL}/${id}`);
    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        status: res.status,
        data: data,
      };
    }
    throw new Error("Failed to fetch item");
  },

  submitItem: async (
    csrftoken: string,
    postData: PostItem
  ): Promise<ResponseType<Item>> => {
    const res = await fetch(`${itemsURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrftoken,
      },
      credentials: "include",
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        status: res.status,
        data: data,
      };
    }
    throw new Error("Failed to submit item");
  },

  fetchComments: async (item_id: number): Promise<ResponseType<Comment[]>> => {
    const res = await fetch(`${itemsURL}/${item_id}/comments`);
    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        status: res.status,
        data: data,
      };
    }
    throw new Error("Failed to fetch comments");
  },
};
