"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type SizeSectionProps = {
  selected: string;
  setSelected: (size: string) => void;
};

const SizeSection = ({ selected, setSelected }: SizeSectionProps) => {
  const handleSizeClick = (size: string) => {
    // If clicking the already selected size, deselect it
    setSelected(selected === size ? "" : size);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap">
            {["XS", "SM", "MD", "LG", "XL", "2XL", "3XL", "FREE"].map(
              (size, index) => (
                <button
                  key={index}
                  type="button"
                  className={cn([
                    "bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px]",
                    "hover:bg-gray-200 transition-colors",
                    selected === size
                      ? "bg-black font-medium text-white hover:bg-black/90"
                      : "hover:bg-gray-200",
                  ])}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              )
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
