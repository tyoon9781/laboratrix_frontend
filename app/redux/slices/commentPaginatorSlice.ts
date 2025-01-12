import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommentPageState {
  currentCommentPage: number;
  commentPageSize: number;
  totalCommentPage: number;
}

const initialState: CommentPageState = {
  currentCommentPage: 1,
  commentPageSize: 10,
  totalCommentPage: 10,
};

const commentPaginatorSlice = createSlice({
  name: "commentPage",
  initialState,
  reducers: {
    initCommentPage(state, action: PayloadAction<CommentPageState>) {
      return action.payload;
    },
    setCommentCurrentPage(state, action: PayloadAction<number>) {
      state.currentCommentPage = action.payload;
    },
  },
});

export const { initCommentPage, setCommentCurrentPage } = commentPaginatorSlice.actions;
export default commentPaginatorSlice.reducer;