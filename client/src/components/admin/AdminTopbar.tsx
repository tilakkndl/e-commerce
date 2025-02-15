"use client";
import { useState } from "react";
import { Menu } from "lucide-react"; // Hamburger menu icon
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";

const AdminTopbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className=" flex px-5 py-2 box-border items-center justify-between">
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
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg"
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default AdminTopbar;
