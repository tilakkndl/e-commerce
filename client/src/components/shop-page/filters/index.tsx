import React, { useState } from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import DressStyleSection from "@/components/shop-page/filters/DressStyleSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Filters = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 10000]);
  const [selected, setSelected] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const router = useRouter();

  const handleApplyFilter = () => {
    const params = new URLSearchParams();

    // Add status
    params.set("status", "active");

    // Add price range
    params.set("price[gte]", priceRange[0].toString());
    params.set("price[lte]", priceRange[1].toString());

    // Add color if selected
    if (selectedColor) {
      params.set("color", selectedColor);
    }

    // Add size if selected
    if (selected) {
      params.set("size", selected);
    }

    const url = `/shop?${params.toString()}`;
    router.push(url);
  };

  const handleClearFilters = () => {
    // Reset all states to default values
    setPriceRange([10, 10000]);
    setSelected("");
    setSelectedColor("");

    // Redirect to shop with only active status
    router.push("/shop?status=active");
  };

  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <DressStyleSection />
      <hr className="border-t-black/60" />
      <PriceSection priceRange={priceRange} setPriceRange={setPriceRange} />
      <hr className="border-t-black/10" />
      <ColorsSection
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <hr className="border-t-black/10" />
      <SizeSection selected={selected} setSelected={setSelected} />
      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          variant="outline"
          className="w-1/2 rounded-full text-sm font-medium py-4 h-12 border-black hover:bg-gray-100"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
        <Button
          type="button"
          className="w-1/2 rounded-full text-sm font-medium py-4 h-12 bg-black hover:bg-black/90"
          onClick={handleApplyFilter}
        >
          Apply Filter
        </Button>
      </div>
    </>
  );
};

export default Filters;
