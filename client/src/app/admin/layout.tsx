"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import DynamicBreadcrumb from "@/components/admin/DynamicBreadcrumb";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = Cookies.get("userData");
    if (!userData) {
      router.replace("/signin");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "admin") {
        router.replace("/");
        return;
      }
      setIsAuthorized(true);
    } catch (error) {
      router.replace("/signin");
    }
  }, [router]);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev); // Toggle sidebar visibility
  };

  if (!isAuthorized) {
    return null;
  }

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
