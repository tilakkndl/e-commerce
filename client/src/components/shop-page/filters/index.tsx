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
  const [selected, setSelected] = useState<string>("Large");

  const router = useRouter();

  const handleApplyFilter = () => {
    const url = `/shop?status=active&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`;
    router.push(url);
  };
  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <PriceSection priceRange={priceRange} setPriceRange={setPriceRange} />
      <hr className="border-t-black/10" />
      <ColorsSection />
      <hr className="border-t-black/10" />
      <SizeSection selected={selected} setSelected={setSelected} />
      <hr className="border-t-black/10" />
      <DressStyleSection />
      <Button
        type="button"
        className="bg-black w-full rounded-full text-sm font-medium py-4 h-12"
        onClick={handleApplyFilter}
      >
        Apply Filter
      </Button>
    </>
  );
};

export default Filters;
