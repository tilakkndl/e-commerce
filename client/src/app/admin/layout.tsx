"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Pass toggleSidebar to AdminTopbar */}
      <AdminTopbar toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex">
        {/* Pass showSidebar to AdminSidebar */}
        <AdminSidebar showSidebar={showSidebar} />
        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
}
