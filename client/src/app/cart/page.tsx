"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { CartItem, CartsState } from "@/lib/features/carts/cartsSlice";
import { OrderRequest, OrderResponse } from "@/types/order.types";

export default function CartPage() {
  // Type the Redux state correctly with fallback for undefined
  const { cart, totalPrice, adjustedTotalPrice }: CartsState = useAppSelector(
    (state: RootState) =>
      state.carts || { cart: null, totalPrice: 0, adjustedTotalPrice: 0 }
  );

  const router = useRouter();

  // Type the user ID from Redux with fallback for undefined
  const userId = useAppSelector((state: RootState) => state.user?._id) as
    | string
    | number
    | undefined;
  const token = Cookies.get("authToken") as string | undefined;

  // Construct the request object with proper typing and fallback
  const request: OrderRequest = {
    user: userId || "",
    orders:
      cart?.items.map((item) => ({
        product: item.data._id,
        variant: item.selectedVariant._id,
        quantity: item.quantity,
        size: item.selectedSize,
      })) || [],
  };

  const checkoutHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !userId) {
      alert("Please log in to proceed with checkout.");
      return;
    }

    try {
      const response = await axios.post<OrderResponse>(
        "http://localhost:5000/api/v1/orders",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      if (response.data.success && response.data.data._id) {
        router.push(`/checkout?order=${response.data.data._id}`);
      } else {
        alert("Order placed, but no order ID received. Contact support.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error("Checkout error:", axiosError);
      if (axiosError.code === "ERR_NETWORK") {
        alert(
          "Network error. Please check your connection or try again later."
        );
      } else if (axiosError.response) {
        alert(`Error: ${axiosError.response.data.message || "Unknown error"}`);
      } else {
        alert("An error occurred during checkout. Please try again.");
      }
    }
  };

  console.log("Cart:", cart);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
              ])}
            >
              Your Cart
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {cart.items.map(
                  (product: CartItem, idx: number, arr: CartItem[]) => (
                    <React.Fragment
                      key={
                        product.data._id +
                        product.selectedVariant._id +
                        product.selectedSize
                      }
                    >
                      <ProductCard data={product} />
                      {idx !== arr.length - 1 && (
                        <hr className="border-t-black/10" />
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                <h6 className="text-xl md:text-2xl font-bold text-black">
                  Order Summary
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Subtotal</span>
                    <span className="md:text-xl font-bold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Discount (
                      {totalPrice > 0
                        ? Math.round(
                            ((totalPrice - adjustedTotalPrice) / totalPrice) *
                              100
                          )
                        : 0}
                      %)
                    </span>
                    <span className="md:text-xl font-bold text-red-600">
                      -${(totalPrice - adjustedTotalPrice).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Delivery Fee
                    </span>
                    <span className="md:text-xl font-bold">Free</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold">
                      ${adjustedTotalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Text>
                      <MdOutlineLocalOffer className="text-black/40 text-2xl" />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="text"
                      name="code"
                      placeholder="Add promo code"
                      className="bg-transparent placeholder:text-black/40"
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    className="bg-black rounded-full w-full max-w-[119px] h-[48px]"
                  >
                    Apply
                  </Button>
                </div>
                <Button
                  type="button"
                  className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                  onClick={checkoutHandler}
                >
                  Go to Checkout{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-black mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
