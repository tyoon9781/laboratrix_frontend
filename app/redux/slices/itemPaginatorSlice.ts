import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemPageState {
  currentItemPage: number;
  itemPageSize: number;
  totalItemPage: number;
}

const initialState: ItemPageState = {
  currentItemPage: 1,
  itemPageSize: 10,
  totalItemPage: 10,
};

const itemPaginatorSlice = createSlice({
  name: "itemsPage",
  initialState,
  reducers: {
    initItemsPageSize(state, action: PayloadAction<number>) {
      state.totalItemPage = action.payload;
    },
    setItemsCurrentPage(state, action: PayloadAction<number>) {
      state.currentItemPage = action.payload;
    },
  },
});

export const { initItemsPageSize, setItemsCurrentPage } = itemPaginatorSlice.actions;
export default itemPaginatorSlice.reducer;
