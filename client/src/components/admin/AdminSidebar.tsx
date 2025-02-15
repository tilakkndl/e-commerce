"use client";
import Link from "next/link";
import { LayoutDashboard, Package, Users, Tag } from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

const AdminSidebar = ({ showSidebar }: { showSidebar: boolean }) => {
  return (
    <aside
      className={cn(
        " shadow-md max-h-frame flex flex-col p-4 md:sticky top-0 left-0 transition-all duration-300",
        showSidebar ? "w-20 md:w-64" : "w-0  md:w-64", // Toggling width
        showSidebar ? "opacity-100" : "opacity-0 md:opacity-100", // Toggling visibility
        "overflow-hidden"
      )}
    >
      <nav className="space-y-2">
        <Link
          href="/admin"
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
        >
          <LayoutDashboard size={20} />{" "}
          <span className="hidden md:inline">Dashboard</span>
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
        >
          <Package size={20} />{" "}
          <span className="hidden md:inline">Products</span>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
        >
          <Tag size={20} /> <span className="hidden md:inline">Orders</span>
        </Link>
        <Link
          href="/admin/users"
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
        >
          <Users size={20} /> <span className="hidden md:inline">Users</span>
        </Link>
      </nav>

      <Separator className="hidden md:block my-4" />
    </aside>
  );
};

export default AdminSidebar;
