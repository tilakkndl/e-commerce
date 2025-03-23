"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/redux";
import { initializeUserFromStorage } from "@/lib/features/user/userSlice";

export default function UserInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUserFromStorage());
  }, [dispatch]);

  return null;
}
