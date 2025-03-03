import { compareArrays } from "@/lib/utils";
import Product, { Variant, Discount } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const calcAdjustedTotalPrice = (
  totalPrice: number,
  data: CartItem,
  quantity?: number
): number => {
  const price = data.data.price;
  const discountPercentage = data.data.discount || 0; // Treat discount as percentage
  const discountedPrice = Math.round(price - (price * discountPercentage) / 100);
  return discountedPrice * (quantity ?? data.quantity);
};

export type CartItem = {
  data: Product;
  quantity: number;
  selectedVariant: Variant;
  selectedSize: string;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

export type RemoveCartItem = {
  _id: string; // Match Product._id
};

interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  action: "update" | "add" | "delete" | null;
}

const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      if (state.cart === null) {
        state.cart = {
          items: [newItem],
          totalQuantities: newItem.quantity,
        };
        state.totalPrice = newItem.data.price * newItem.quantity;
        state.adjustedTotalPrice = calcAdjustedTotalPrice(0, newItem);
        state.action = "add";
        return;
      }

      // Check if item with same product, variant, and size exists
      const isItemInCart = state.cart.items.find(
        (item) =>
          item.data._id === newItem.data._id &&
          item.selectedVariant._id === newItem.selectedVariant._id &&
          item.selectedSize === newItem.selectedSize
      );

      if (isItemInCart) {
        state.cart.items = state.cart.items.map((item) =>
          item.data._id === newItem.data._id &&
          item.selectedVariant._id === newItem.selectedVariant._id &&
          item.selectedSize === newItem.selectedSize
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
        state.cart.totalQuantities += newItem.quantity;
        state.totalPrice += newItem.data.price * newItem.quantity;
        state.adjustedTotalPrice += calcAdjustedTotalPrice(0, newItem);
        state.action = "update";
      } else {
        state.cart.items.push(newItem);
        state.cart.totalQuantities += newItem.quantity;
        state.totalPrice += newItem.data.price * newItem.quantity;
        state.adjustedTotalPrice += calcAdjustedTotalPrice(0, newItem);
        state.action = "add";
      }
    },

    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const isItemInCart = state.cart.items.find(
        (item) => item.data._id === action.payload._id
      );

      if (isItemInCart) {
        state.cart.items = state.cart.items
          .map((item) =>
            item.data._id === action.payload._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);
        state.cart.totalQuantities -= 1;
        state.totalPrice -= isItemInCart.data.price;
        state.adjustedTotalPrice -= calcAdjustedTotalPrice(0, isItemInCart, 1);
        state.action = "delete";
      }
    },

    remove: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const isItemInCart = state.cart.items.find(
        (item) => item.data._id === action.payload._id
      );

      if (isItemInCart) {
        state.cart.items = state.cart.items.filter(
          (item) => item.data._id !== action.payload._id
        );
        state.cart.totalQuantities -= isItemInCart.quantity;
        state.totalPrice -= isItemInCart.data.price * isItemInCart.quantity;
        state.adjustedTotalPrice -= calcAdjustedTotalPrice(
          0,
          isItemInCart,
          isItemInCart.quantity
        );
        state.action = "delete";
      }
    },
  },
});

export const { addToCart, removeCartItem, remove } = cartsSlice.actions;

export default cartsSlice.reducer;