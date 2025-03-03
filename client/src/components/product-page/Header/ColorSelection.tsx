"use client";

import { Variant } from "@/types/product.types";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface VariantsProps {
  variants: Variant[];
  setSelectedVariant: (params: Variant) => void;
  selectedVariant: Variant;
}

const ColorSelection: React.FC<VariantsProps> = ({
  variants,
  setSelectedVariant,
  selectedVariant,
}) => {
  console.log("variants", variants);
  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Select Colors
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {" "}
        {variants.map((variant, index) => (
          <button
            key={index}
            type="button"
            style={{
              backgroundColor: variant.hexColor
                .replace("bg-[", "")
                .replace("]", ""),
            }}
            className="rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center"
            onClick={() => setSelectedVariant(variant)}
          >
            {selectedVariant.color === variant.color && (
              <IoMdCheckmark className="text-base text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
