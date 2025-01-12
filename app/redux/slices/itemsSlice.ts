import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemState {
  id: string;
  title: string;
  contents: string;
  user_name: string;
  view_count: number;
  comment_count: number;
  created_at: string;
}

const initialState: ItemState[] = [];

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ItemState[]>) {
      return action.payload;
    },
  },
});

export const { setItems } = itemSlice.actions;
export default itemSlice.reducer;
