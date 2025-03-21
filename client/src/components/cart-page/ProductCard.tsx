"use client";

import React from "react";
import { PiTrashFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "@/components/ui/CartCounter";
import { Button } from "../ui/button";
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem,
} from "@/lib/features/carts/cartsSlice"; // Adjust path as needed
import { useAppDispatch } from "@/lib/hooks/redux";
import { openModal, closeModal } from "@/lib/features/modal/modalSlice";

type ProductCardProps = {
  data: CartItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const product = data.data;

  const handleDelete = () => {
    dispatch(
      openModal(
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Remove Item</h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{product.name}</span> from your
            cart?
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
                dispatch(remove({ _id: product._id }));
                dispatch(closeModal());
              }}
              className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )
    );
  };

  const discountedPrice =
    product.discount > 0
      ? Math.round(product.price - (product.price * product.discount) / 100)
      : product.price;

  return (
    <div className="flex items-start space-x-4">
      {/* Product Image */}
      <Link
        href={`/shop/product/${product._id}/${product.name
          .split(" ")
          .join("-")}`}
        className="bg-[#F0EEED] rounded-lg w-full min-w-[100px] max-w-[100px] sm:max-w-[124px] aspect-square overflow-hidden"
      >
        <Image
          src={
            data.selectedVariant.gallery[0]?.url || "/images/placeholder.png"
          } // Fallback if gallery is empty
          width={124}
          height={124}
          className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
          alt={product.name}
          priority
        />
      </Link>

      <div className="flex w-full self-stretch flex-col">
        {/* Product Name and Remove Button */}
        <div className="flex items-center justify-between">
          <Link
            href={`/shop/product/${product._id}/${product.name
              .split(" ")
              .join("-")}`}
            className="text-black font-bold text-base xl:text-xl"
          >
            {product.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 md:h-9 md:w-9"
            onClick={handleDelete}
            aria-label={`Remove ${product.name} from cart`}
          >
            <PiTrashFill className="text-xl md:text-2xl text-red-600" />
          </Button>
        </div>

        {/* Size */}
        <div className="-mt-1">
          <span className="text-black text-xs md:text-sm mr-1">Size:</span>
          <span className="text-black/60 text-xs md:text-sm">
            {data.selectedSize}
          </span>
        </div>

        {/* Color */}
        <div className="mb-auto -mt-1.5">
          <span className="text-black text-xs md:text-sm mr-1">Color:</span>
          <span className="text-black/60 text-xs md:text-sm">
            {data.selectedVariant.color}
          </span>
        </div>

        {/* Price and Counter */}
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex items-center space-x-[5px] xl:space-x-2.5">
            <span className="font-bold text-black text-xl xl:text-2xl">
              ${discountedPrice}
            </span>
            {product.discount > 0 && (
              <>
                <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
                  ${product.price}
                </span>
                <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>
          <CartCounter
            initialValue={data.quantity}
            onAdd={() => dispatch(addToCart({ ...data, quantity: 1 }))}
            onRemove={() =>
              data.quantity === 1
                ? handleDelete()
                : dispatch(removeCartItem({ _id: product._id }))
            }
            isZeroDelete
            className="px-5 py-3 max-h-8 md:max-h-10 min-w-[105px] max-w-[105px] sm:max-w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
