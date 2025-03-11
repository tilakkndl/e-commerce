import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
type PriceSectionProps = {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
};

const PriceSection = ({ priceRange, setPriceRange }: PriceSectionProps) => {
  const handlePriceChange = (value: number[]) => {
    if (value.length === 2) {
      setPriceRange([value[0], value[1]]);
    }
    console.log(priceRange);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-visible">
          <Slider
            value={priceRange}
            min={0}
            max={10000}
            step={100}
            onValueChange={handlePriceChange}
          />
          <div className="mb-3" />
          <div className="flex justify-between text-sm text-black/60 mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
