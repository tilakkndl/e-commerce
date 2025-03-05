import { compareArrays } from "@/lib/utils";
import Product, { Variant, Discount } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const calcAdjustedTotalPrice = (
  totalPrice: number,
  data: CartItem,
  quantity?: number
): number => {
  const price = data.data.price;
  const discountPercentage = data.data.discount || 0;
  const discountedPrice = Math.round(price - (price * discountPercentage) / 100);
  return discountedPrice * (quantity ?? data.quantity);
};


export interface CartItem {
  data: Product;
  quantity: number;
  selectedVariant: Variant;
  selectedSize: string;
}

export interface Cart {
  items: CartItem[];
  totalQuantities: number;
}

export interface RemoveCartItem {
  _id: string; 
}

export interface CartsState {
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
        state.adjustedTotalPrice = calcAdjustedTotalPrice(state.totalPrice, newItem);
        state.action = "add";
        return;
      }

      // Check if item with same product, variant, and size exists
      const existingItemIndex = state.cart.items.findIndex(
        (item) =>
          item.data._id === newItem.data._id &&
          item.selectedVariant._id === newItem.selectedVariant._id &&
          item.selectedSize === newItem.selectedSize
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cart.items[existingItemIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;
        state.cart.items[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
        state.cart.totalQuantities += newItem.quantity;
        state.totalPrice += newItem.data.price * newItem.quantity;
        state.adjustedTotalPrice += calcAdjustedTotalPrice(0, newItem, newItem.quantity);
        state.action = "update";
      } else {
        state.cart.items.push(newItem);
        state.cart.totalQuantities += newItem.quantity;
        state.totalPrice += newItem.data.price * newItem.quantity;
        state.adjustedTotalPrice += calcAdjustedTotalPrice(0, newItem, newItem.quantity);
        state.action = "add";
      }
    },

    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.data._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cart.items[existingItemIndex];
        if (existingItem.quantity > 1) {
          state.cart.items[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
          state.cart.totalQuantities -= 1;
          state.totalPrice -= existingItem.data.price;
          state.adjustedTotalPrice -= calcAdjustedTotalPrice(0, existingItem, 1);
          state.action = "update";
        } else {
          state.cart.items.splice(existingItemIndex, 1);
          state.cart.totalQuantities -= existingItem.quantity;
          state.totalPrice -= existingItem.data.price * existingItem.quantity;
          state.adjustedTotalPrice -= calcAdjustedTotalPrice(0, existingItem, existingItem.quantity);
          state.action = "delete";
          if (state.cart.items.length === 0) {
            state.cart = null; 
          }
        }
      }
    },

    remove: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.data._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cart.items[existingItemIndex];
        state.cart.items.splice(existingItemIndex, 1);
        state.cart.totalQuantities -= existingItem.quantity;
        state.totalPrice -= existingItem.data.price * existingItem.quantity;
        state.adjustedTotalPrice -= calcAdjustedTotalPrice(0, existingItem, existingItem.quantity);
        state.action = "delete";
        if (state.cart.items.length === 0) {
          state.cart = null;
        }
      }
    },

    removeAll: (state) => {
      state.cart = null;
      state.totalPrice = 0;
      state.adjustedTotalPrice = 0;
      state.action = null;
    },
  },
});

export const { addToCart, removeCartItem, remove, removeAll } = cartsSlice.actions;

export default cartsSlice.reducer;