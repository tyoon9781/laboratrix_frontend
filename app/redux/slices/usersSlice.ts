import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserView } from "@/app/types/auth";

export const guestUser: UserView = {
  id: 0,
  user_name: "Guest",
  email: "noEmail",
};

const userSlice = createSlice({
  name: "user",
  initialState: guestUser,
  reducers: {
    setUser(state, action: PayloadAction<UserView>) {
      return action.payload;
    },
    logoutUser(state) {
      return guestUser;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
