"use client";

import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { ModalProvider } from "./ModalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ModalProvider>{children}</ModalProvider>
    </Provider>
  );
}
