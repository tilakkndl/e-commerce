import { UserState } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getUserFromCookie = (): UserState & { token?: string } => {
  if (typeof window === "undefined")
    return { _id: null, name: "", username: "", role: null };

  try {
    const userData = Cookies.get("userData");
    const authToken = Cookies.get("authToken");

    if (!userData || !authToken) {
      Cookies.remove("userData", { path: "/" });
      Cookies.remove("authToken", { path: "/" });
      return { _id: null, name: "", username: "", role: null };
    }

    const parsedUser = JSON.parse(userData);
    return parsedUser._id && parsedUser.role
      ? { ...parsedUser, token: authToken }
      : { _id: null, name: "", username: "", role: null };
  } catch {
    Cookies.remove("userData", { path: "/" });
    Cookies.remove("authToken", { path: "/" });
    return { _id: null, name: "", username: "", role: null };
  }
};

const initialState: UserState = getUserFromCookie();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState & { token?: string }>) => {
      const { _id, name, username, role, token } = action.payload;
      Object.assign(state, { _id, name, username, role });

      if (typeof window !== "undefined") {
        if (_id && token) {
          Cookies.set(
            "userData",
            JSON.stringify({ _id, name, username, role }),
            {
              expires: 1,
              secure: process.env.NODE_ENV === "production",
              sameSite: "Lax",
              path: "/",
            }
          );
          Cookies.set("authToken", token, {
            expires: 1,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            path: "/",
          });
        } else {
          Cookies.remove("userData", { path: "/" });
          Cookies.remove("authToken", { path: "/" });
        }
      }
    },
    removeUser: (state) => {
      state._id = null;
      state.name = "";
      state.username = "";
      state.role = null;

      if (typeof window !== "undefined") {
        Cookies.remove("authToken", { path: "/" });
        Cookies.remove("userData", { path: "/" });

        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
