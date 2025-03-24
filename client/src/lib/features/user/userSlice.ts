import { UserState } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

      // Only store in localStorage if we're in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state));
      }
    },
    removeUser: (state) => {
      state._id = null;
      state.name = "";
      state.username = "";
      state.role = null;

      // Only remove from localStorage if we're in the browser
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    initializeUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser._id && parsedUser.role) {
              state._id = parsedUser._id;
              state.name = parsedUser.name;
              state.username = parsedUser.username;
              state.role = parsedUser.role;
            } else {
              localStorage.removeItem("user");
            }
          } catch (error) {
            localStorage.removeItem("user");
          }
        }
      }
    },
  },
});

export const { setUser, removeUser, initializeUserFromStorage } =
  userSlice.actions;
export default userSlice.reducer;
