"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];

  // Remove last segment if it's a number (Product ID)
  const lastSegmentIsNumber =
    pathSegments.length > 0 &&
    /^\d+$/.test(pathSegments[pathSegments.length - 1]);
  if (lastSegmentIsNumber) {
    pathSegments.pop(); // Remove the product ID from the breadcrumb list
  }

  return (
    <Breadcrumb className="py-3">
      <BreadcrumbList>
        {/* Home Breadcrumb */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  // Last breadcrumb should be bold
                  <BreadcrumbPage className="capitalize">
                    {decodeURIComponent(segment)}
                  </BreadcrumbPage>
                ) : // Disable navigation for "updateProduct" to prevent errors
                segment === "updateProduct" ? (
                  <BreadcrumbPage className="capitalize">
                    {decodeURIComponent(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="capitalize">
                    {decodeURIComponent(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
