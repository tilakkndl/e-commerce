import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from cookie
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear all auth data
      Cookies.remove("authToken", { path: "/" });
      Cookies.remove("userData", { path: "/" });
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// Function to set user data in both localStorage and cookie
export const setUserData = (userData: any) => {
  // Store in localStorage
  localStorage.setItem("user", JSON.stringify(userData));

  // Store in cookie for middleware access
  Cookies.set(
    "userData",
    JSON.stringify({
      _id: userData._id,
      name: userData.name,
      username: userData.username,
      role: userData.role,
    }),
    {
      expires: 1,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    }
  );
};

// Function to clear user data
export const clearUserData = () => {
  localStorage.removeItem("user");
  Cookies.remove("userData");
};

export default api;
