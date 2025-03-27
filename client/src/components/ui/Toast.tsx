"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { hideToast } from "@/lib/features/toast/toastSlice";
import { useEffect } from "react";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const Toast = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message, type, duration } = useAppSelector(
    (state: RootState) => state.toast
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, dispatch]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const backgrounds = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  };

  const textColors = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
    info: "text-blue-800",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={cn(
          "flex items-center space-x-3 px-4 py-3 rounded-lg border shadow-lg",
          backgrounds[type]
        )}
      >
        {icons[type]}
        <p className={cn("text-sm font-medium", textColors[type])}>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
