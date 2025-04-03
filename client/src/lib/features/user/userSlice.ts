import { UserState } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initialize user state from cookie if available
const getUserFromCookie = (): UserState & { token?: string } => {
  if (typeof window !== "undefined") {
    const userData = Cookies.get("userData");
    const authToken = Cookies.get("authToken");

    // Check if both cookies exist
    if (userData && authToken) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser._id && parsedUser.role) {
          return {
            ...parsedUser,
            token: authToken,
          };
        }
      } catch (error) {
        // If parsing fails, remove both cookies
        Cookies.remove("userData");
        Cookies.remove("authToken");
      }
    } else {
      // If either cookie is missing, remove both
      Cookies.remove("userData");
      Cookies.remove("authToken");
    }
  }
  return {
    _id: null,
    name: "",
    username: "",
    role: null,
  };
};

const initialState: UserState = getUserFromCookie();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState & { token?: string }>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.role = action.payload.role;

      // Store user data and token in cookies
      if (typeof window !== "undefined") {
        // Only set cookies if both user data and token are present
        if (action.payload._id && action.payload.token) {
          const userData = JSON.stringify({
            _id: action.payload._id,
            name: action.payload.name,
            username: action.payload.username,
            role: action.payload.role,
          });

          // Set both cookies with same options
          Cookies.set("userData", userData, {
            expires: 1,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });

          Cookies.set("authToken", action.payload.token, {
            expires: 1,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });
        } else {
          // If either user data or token is missing, remove both cookies
          Cookies.remove("userData");
          Cookies.remove("authToken");
        }
      }
    },
    removeUser: (state) => {
      state._id = null;
      state.name = "";
      state.username = "";
      state.role = null;

      // Remove both authToken and userData from cookies
      if (typeof window !== "undefined") {
        Cookies.remove("authToken");
        Cookies.remove("userData");
      }
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
