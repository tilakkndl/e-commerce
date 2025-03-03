"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import Product, { Variant } from "@/types/product.types";
interface AddToCartProps {
  data: Product;
  selectedVariant: Variant;
  selectedSize: string;
}

const AddToCardSection = ({
  data,
  selectedVariant,
  selectedSize,
}: AddToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      <CartCounter onAdd={setQuantity} onRemove={setQuantity} />
      <AddToCartBtn
        data={data}
        selectedSize={selectedSize}
        selectedVariant={selectedVariant}
        quantity={quantity}
      />
    </div>
  );
};

export default AddToCardSection;
