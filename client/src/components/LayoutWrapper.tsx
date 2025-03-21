"use client";

import { usePathname } from "next/navigation";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import React, { ReactNode } from "react";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const user = useAppSelector((state: RootState) => state.user);

  return (
    <React.Fragment>
      {!isAdminPage && !user._id && <TopBanner />}
      {!isAdminPage && <TopNavbar />}
      {children}
      {!isAdminPage && <Footer />}
    </React.Fragment>
  );
}
