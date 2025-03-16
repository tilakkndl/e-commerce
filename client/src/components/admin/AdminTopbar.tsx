"use client";
import { useState } from "react";
import { Menu, Loader2 } from "lucide-react"; // Hamburger menu icon
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/hooks/redux";
import { removeUser } from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";
import { openModal, closeModal } from "@/lib/features/modal/modalSlice";

const AdminTopbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay for UX
      dispatch(removeUser());
      dispatch(closeModal());
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutClick = () => {
    dispatch(
      openModal(
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to log out from the admin panel?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-6 py-2 rounded-full border border-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoggingOut}
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-6 py-2 rounded-full bg-black text-white hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    <div className=" flex px-5 py-2 box-border items-center justify-between">
      <div className="flex space-x-5 items-center">
        <h2 className="text-xl font-bold">
          <Link
            href="/admin"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            NEPHEMP
          </Link>
          <br />
          <span className="">/ Admin Panel</span>
        </h2>

        {/* Hamburger button for small screens */}
        <button onClick={toggleSidebar} className="md:hidden p-2 rounded-lg">
          <Menu size={24} />
        </button>
      </div>
      <Button
        className="px-3 py-1 rounded-none border border-black/80 disabled:opacity-50"
        onClick={handleLogoutClick}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Logging out...
          </div>
        ) : (
          "Log Out"
        )}
      </Button>
    </div>
  );
};

export default AdminTopbar;
