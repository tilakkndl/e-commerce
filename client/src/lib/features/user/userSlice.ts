import { UserState } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const getUserFromLocalStorage = (): UserState => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { id: null, name: "", username: "", role: null };
  }
  return { id: null, name: "", username: "", role: null };
};

const initialState: UserState = getUserFromLocalStorage();
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log(action.payload);
      if (state.id === null) {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.role = action.payload.role;
        console.log(state.id, state.name, state.username, state.role);
      }
      localStorage.setItem("user", JSON.stringify(state));
      Cookies.set("user", JSON.stringify(state), { expires: 1, path: "/" });
    },
    removeUser: (state) => {
      state.id = null;
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
