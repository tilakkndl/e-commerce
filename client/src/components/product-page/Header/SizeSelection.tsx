"use client";

import { cn } from "@/lib/utils";
import React from "react";
interface sizeSelectionProps {
  availableSizes: string[];
  setSelectedSize: (params: string) => void;
  selectedSize: string;
}

const SizeSelection = ({
  availableSizes,
  setSelectedSize,
  selectedSize,
}: sizeSelectionProps) => {
 

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Choose Size
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {availableSizes.map((size, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              "bg-[#F0F0F0] flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px]",
              selectedSize === size && "bg-black font-medium text-white",
            ])}
            onClick={() => setSelectedSize(size.toString())}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
