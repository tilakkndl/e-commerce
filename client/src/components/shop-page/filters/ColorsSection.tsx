"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";

interface ColorsSectionProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorsSection = ({
  selectedColor,
  setSelectedColor,
}: ColorsSectionProps) => {
  const colors = [
    { name: "green", class: "bg-green-600" },
    { name: "red", class: "bg-red-600" },
    { name: "yellow", class: "bg-yellow-300" },
    { name: "orange", class: "bg-orange-600" },
    { name: "grey", class: "bg-grey-400" },
    { name: "blue", class: "bg-blue-600" },
    { name: "purple", class: "bg-purple-600" },
    { name: "pink", class: "bg-pink-600" },
    { name: "white", class: "bg-white" },
    { name: "black", class: "bg-black" },
  ];

  const handleColorClick = (colorName: string) => {
    setSelectedColor(selectedColor === colorName ? "" : colorName);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex space-2.5 flex-wrap md:grid grid-cols-5 gap-2.5">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                className={cn([
                  color.class,
                  "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border",
                  selectedColor === color.name
                    ? "ring-2 ring-black"
                    : "border-black/20",
                  color.name === "white" && "border-gray-200",
                ])}
                onClick={() => handleColorClick(color.name)}
              >
                {selectedColor === color.name && (
                  <IoMdCheckmark
                    className={cn(
                      "text-base",
                      color.name === "white" || color.name === "yellow"
                        ? "text-black"
                        : "text-white"
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
