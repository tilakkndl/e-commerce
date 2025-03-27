import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastState {
  isOpen: boolean;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

const initialState: ToastState = {
  isOpen: false,
  message: "",
  type: "info",
  duration: 3000,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Omit<ToastState, "isOpen">>) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.duration = action.payload.duration || 3000;
    },
    hideToast: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
