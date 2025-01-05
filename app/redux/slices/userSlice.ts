import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  user_name: string;
  email: string;
}

export const guest: UserState = {
  id: 0,
  user_name: "Guest",
  email: "noEmail",
};

const userSlice = createSlice({
  name: "user",
  initialState: guest,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
