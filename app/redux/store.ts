import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
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
=======
import itemReducer from "./slices/itemSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    user: userReducer,
>>>>>>> 6ff69093a62da3fb26d53868d25f9d6ba600b1cc
  },
});

export type RootState = ReturnType<typeof store.getState>;
<<<<<<< HEAD
export type AppDispatch = typeof store.dispatch;
=======
export type AppDispatch = typeof store.dispatch;
>>>>>>> 6ff69093a62da3fb26d53868d25f9d6ba600b1cc
