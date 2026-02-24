import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDTO } from "shared/api";

type InitialState = {
  user: UserDTO | null;
};

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
    updateUserCurrency: (state, action: PayloadAction<"BYN" | "RUB">) => {
      if (state.user) {
        state.user.currency = action.payload;
      }
    },
  },
});

export const { signIn, signOut, updateUserCurrency } = userSlice.actions;
export default userSlice.reducer;
