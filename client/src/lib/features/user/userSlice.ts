import { UserState } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: UserState = {
  _id: null,
  name: "",
  username: "",
  role: null,
};

// Cookie settings for different environments
const cookieSettings = {
  expires: 1,
  path: "/",
  sameSite: "lax" as const,
  secure: true, // Always use secure in production
  domain: process.env.NEXT_PUBLIC_DOMAIN || undefined, // Add your domain in production
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

      // Only store in localStorage and cookies if we're in the browser
      if (typeof window !== "undefined") {
        const userData = JSON.stringify(state);
        localStorage.setItem("user", userData);
        Cookies.set("user", userData, cookieSettings);
      }
    },
    removeUser: (state) => {
      state._id = null;
      state.name = "";
      state.username = "";
      state.role = null;

      // Only remove from localStorage and cookies if we're in the browser
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        Cookies.remove("user", { path: "/", domain: cookieSettings.domain });
      }
    },
    initializeUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        console.log("Initializing user from storage");

        // First try to get from cookie
        const userCookie = Cookies.get("user");
        console.log("Cookie value:", userCookie);

        if (userCookie) {
          try {
            const parsedUser = JSON.parse(userCookie);
            console.log("Parsed cookie user:", parsedUser);

            // Validate the user data
            if (parsedUser._id && parsedUser.role) {
              state._id = parsedUser._id;
              state.name = parsedUser.name;
              state.username = parsedUser.username;
              state.role = parsedUser.role;
              return;
            } else {
              console.log("Invalid user data in cookie");
              Cookies.remove("user", {
                path: "/",
                domain: cookieSettings.domain,
              });
            }
          } catch (error) {
            console.log("Error parsing cookie:", error);
            Cookies.remove("user", {
              path: "/",
              domain: cookieSettings.domain,
            });
          }
        }

        // If no valid cookie, try localStorage
        const storedUser = localStorage.getItem("user");
        console.log("LocalStorage value:", storedUser);

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            console.log("Parsed localStorage user:", parsedUser);

            // Validate the user data
            if (parsedUser._id && parsedUser.role) {
              state._id = parsedUser._id;
              state.name = parsedUser.name;
              state.username = parsedUser.username;
              state.role = parsedUser.role;

              // Sync with cookie
              Cookies.set("user", storedUser, cookieSettings);
            } else {
              console.log("Invalid user data in localStorage");
              localStorage.removeItem("user");
            }
          } catch (error) {
            console.log("Error parsing localStorage:", error);
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
