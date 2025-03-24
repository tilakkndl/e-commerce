"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import DynamicBreadcrumb from "@/components/admin/DynamicBreadcrumb";

export default function AdminLayout({
  children,
  productName, // Dynamic product name for breadcrumbs
}: {
  children: React.ReactNode;
  productName?: string; // Optional dynamic product name
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <div className="flex flex-col h-screen lg:px-[10vw] px-0">
      {/* Pass toggleSidebar to AdminTopbar */}
      <AdminTopbar toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex min-h-screen">
        {/* Pass showSidebar to AdminSidebar */}
        <AdminSidebar showSidebar={showSidebar} />
        <main className="flex-1 px-2">
          {/* Breadcrumb component with dynamic productName */}
          <DynamicBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
