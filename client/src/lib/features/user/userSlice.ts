import { UserState } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getUserFromLocalStorage = (): UserState => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { _id: null, name: "", username: "", role: null };
  }
  return { _id: null, name: "", username: "", role: null };
};

const initialState: UserState = getUserFromLocalStorage();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log(action.payload._id);
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.role = action.payload.role;

      localStorage.setItem("user", JSON.stringify(state));
      Cookies.set("user", JSON.stringify(state), { expires: 1, path: "/" });
    },
    removeUser: (state) => {
      state._id = null;
      state.name = "";
      state.username = "";
      state.role = null;

      localStorage.removeItem("user");
      Cookies.remove("user");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
