import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-black text-white text-center py-2 px-2 sm:px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm">
        Every product we create is a
        testament to craftsmanship, attention to detail, and premium materials.      
          <Link href="/register" className="underline font-medium ml-2">
            Register Now
          </Link>
        </p>
      
      </div>
    </div>
  );
};

export default TopBanner;
