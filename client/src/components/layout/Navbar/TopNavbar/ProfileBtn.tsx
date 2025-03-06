"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { satoshi } from "@/styles/fonts";
import { removeUser } from "@/lib/features/user/userSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileButton() {
  const [profileButtonToggle, setProfileButtonToggle] = useState(false);
  const user = useAppSelector((state: RootState) => state.user);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

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
                  onClick={() => {
                    dispatch(removeUser());
                    setProfileButtonToggle(false);
                  }}
                  className="   px-0 w-fit font-normal text-base"
                  variant="ghost"
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </Button>
                {user.role === "admin" && (
                  <Link
                    href={
                      user.role != "admin" ? "/" : "http://localhost:3000/admin"
                    }
                    className="flex text-nowrap items-end  w-fit"
                  >
                    <LayoutDashboard size={16} className="mr-2" />
                    Admin Panel
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
