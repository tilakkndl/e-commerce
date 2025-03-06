"use client";

import { Variant } from "@/types/product.types";
import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdCheck } from "react-icons/md";
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
  const getLuminance = (hex: string) => {
    hex = hex.replace("#", "");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((h) => h + h)
        .join("");
    if (hex.length !== 6) return 128;

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const getTickColor = (hex: string) => {
    const luminance = getLuminance(hex);
    return luminance < 128 ? "white" : "black";
  };
  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Select Colors
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {variants.map((variant, index) => (
          <button
            key={index}
            type="button"
            style={{
              backgroundColor: variant.hexColor,
            }}
            className="rounded-full w-9 sm:w-10 border border-black/80 h-9 sm:h-10 flex items-center justify-center"
            onClick={() => setSelectedVariant(variant)}
          >
            {selectedVariant?._id === variant._id && (
              <MdCheck
                className="text-base"
                style={{ color: getTickColor(variant.hexColor) }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
