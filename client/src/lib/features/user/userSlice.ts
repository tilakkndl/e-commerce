import { UserState } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: UserState = {
  _id: null,
  name: "",
  username: "",
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state._id = null;
      state.name = "";
      state.username = "";
      state.role = null;
    },
    initializeUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const userData = Cookies.get("userData");
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData);
            if (parsedUser._id && parsedUser.role) {
              state._id = parsedUser._id;
              state.name = parsedUser.name;
              state.username = parsedUser.username;
              state.role = parsedUser.role;
            } else {
              Cookies.remove("userData");
            }
          } catch (error) {
            Cookies.remove("userData");
          }
        }
      }
    },
  },
});

export const { setUser, removeUser, initializeUserFromStorage } =
  userSlice.actions;
export default userSlice.reducer;
