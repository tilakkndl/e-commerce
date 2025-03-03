"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Product, { Variant } from "@/types/product.types";
import React from "react";
interface AddToCartBtnProps {
  data:Product;
  quantity:number;
  selectedVariant: Variant;
  selectedSize: string;
}

const AddToCartBtn = ({ data,quantity,selectedVariant,selectedSize }: AddToCartBtnProps) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  return (
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all"
      onClick={() =>
        dispatch(
          addToCart({
            data: data,
            quantity: quantity,
            selectedVariant: selectedVariant,
            selectedSize: selectedSize,

          })
        )
      }
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
