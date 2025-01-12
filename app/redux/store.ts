import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slices/itemsSlice";
import userReducer from "./slices/usersSlice";
import itemsPaginationReducer from "./slices/itemPaginatorSlice";
import commentsPaginationReducer from "./slices/commentPaginatorSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    user: userReducer,
    itemsPage: itemsPaginationReducer,
    commentsPage: commentsPaginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;