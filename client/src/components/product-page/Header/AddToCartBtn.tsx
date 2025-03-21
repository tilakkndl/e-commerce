"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import { openModal, closeModal } from "@/lib/features/modal/modalSlice";
import Product, { Variant } from "@/types/product.types";
import React from "react";
import { integralCF } from "@/styles/fonts";

interface AddToCartBtnProps {
  data: Product;
  quantity: number;
  selectedVariant: Variant;
  selectedSize: string;
}

const AddToCartBtn = ({
  data,
  quantity,
  selectedVariant,
  selectedSize,
}: AddToCartBtnProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      openModal(
        <div className="text-center">
          <h2 className={`${integralCF.className} text-2xl font-bold mb-4`}>
            Confirm Add To Cart
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to add this item to your cart?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-6 py-2 rounded-full border border-black hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    data: data,
                    quantity: quantity,
                    selectedVariant: selectedVariant,
                    selectedSize: selectedSize,
                  })
                );
                dispatch(closeModal());
              }}
              className="px-6 py-2 rounded-full bg-black text-white hover:bg-black/80 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
