"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { satoshi } from "@/styles/fonts";
import { removeUser, setUser } from "@/lib/features/user/userSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ListOrdered, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { openModal, closeModal } from "@/lib/features/modal/modalSlice";
import Cookies from "js-cookie";
import { UserState } from "@/types/user.types";

export default function ProfileButton() {
  const [profileButtonToggle, setProfileButtonToggle] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = useAppSelector((state: RootState) => state.user);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Check for user data in cookies on mount
  useEffect(() => {
    const userData = Cookies.get("userData");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData) as UserState;
        if (parsedUser._id && parsedUser.role) {
          dispatch(setUser(parsedUser));
        } else {
          // Invalid user data, clear cookies
          Cookies.remove("authToken");
          Cookies.remove("userData");
        }
      } catch (error) {
        // Error parsing user data, clear cookies
        Cookies.remove("authToken");
        Cookies.remove("userData");
      }
    }
  }, [dispatch]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      dispatch(removeUser());
      dispatch(closeModal());
      setProfileButtonToggle(false);
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
            Are you sure you want to log out?
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileButtonToggle(false);
      }
    }

    if (profileButtonToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileButtonToggle]);

  return (
    <div className={`relative ${satoshi.className}`} ref={dropdownRef}>
      {user._id === null ? (
        <Link href="/signin">
          <div className="flex items-center space-x-2 max-w-[100px] px-1 cursor-pointer select-none">
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[22px] max-h-[22px]"
            />
          </div>
        </Link>
      ) : (
        <div>
          {/* Profile Button */}
          <div
            className="flex items-center space-x-2 max-w-[100px] px-1 cursor-pointer select-none"
            onClick={() => setProfileButtonToggle((prev) => !prev)}
          >
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[22px] max-h-[22px]"
            />
            <div className="whitespace-nowrap">{user.name.split(" ")[0]}</div>
          </div>

          {/* Dropdown */}
          {profileButtonToggle && (
            <div className="absolute top-full right-0 mt-2  bg-white  text-black cursor-pointer shadow-black/40 shadow-md z-50 rounded-xl">
              <div className=" flex flex-col justify-start px-3 py-2 ">
                <Button
                  onClick={handleLogoutClick}
                  className="px-0 w-fit font-normal text-base"
                  variant="ghost"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : (
                    <LogOut size={16} className="mr-2" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Log Out"}
                </Button>
                {user.role === "admin" && (
                  <Link
                    href={user.role != "admin" ? "/" : `/admin`}
                    className="flex text-nowrap items-center justify-end py-1 w-fit"
                  >
                    <LayoutDashboard size={16} className="mr-2" />
                    Admin Panel
                  </Link>
                )}

                <Link
                  href={`/myorders`}
                  className="flex text-nowrap items-center justify-end py-1 w-fit"
                >
                  <ListOrdered size={16} className="mr-2" />
                  My Orders
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
