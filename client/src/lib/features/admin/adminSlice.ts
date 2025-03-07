import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Product from "@/types/product.types";
import Cookies from "js-cookie";
import { OrderItem } from "@/types/order.types";

interface AdminState {
  products: Product[];
  orders: OrderItem[];
  editableProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  products: [],
  orders: [],
  editableProduct: null,
  loading: false,
  error: null,
};

// Async function to fetch all products
export const fetchAllProducts = createAsyncThunk<
  Product[],
  Record<string, string> | void, // Accepts optional query parameters
  { rejectValue: string }
>("admin/fetchAllProducts", async (params = {}, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ data: Product[] }>(
      `${process.env.NEXT_PUBLIC_ROOT_API}/product`,
      { params } // Pass query parameters here
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
});


// Async function to fetch all orders
export const fetchAllOrders = createAsyncThunk<
  OrderItem[],
  void,
  { rejectValue: string }
>("admin/fetchAllOrders", async (_, { rejectWithValue }) => {
  const token = Cookies.get("authToken") as string | undefined;
  
  try {
    const response = await axios.get<{ data: OrderItem[] }>(
      `${process.env.NEXT_PUBLIC_ROOT_API}/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch orders"
    );
  }
});

// Async function to fetch product by ID
export const findProductById = createAsyncThunk<
  Product | null,
  string,
  { rejectValue: string }
>("admin/findProductById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ data: Product }>(
      `${process.env.NEXT_PUBLIC_ROOT_API}/product/${id}`
    );
    return response.data.data || null;
  } catch (error: any) {
    console.error("Error fetching product by ID:", error);
    return rejectWithValue(
      error.response?.data?.message || "Product Not Found"
    );
  }
});

export const deleteProductById = createAsyncThunk<
  string, // Returns the deleted product's ID
  string, // Takes the product ID as an argument
  { rejectValue: string }
>("admin/deleteProductById", async (id: string, { rejectWithValue }) => {
  try {
    const token = Cookies.get("authToken");
    await axios.delete(`${process.env.NEXT_PUBLIC_ROOT_API}/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id; // Returning the ID so it can be removed from the state
  } catch (error: any) {
    console.error("Error deleting product by ID:", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete product"
    );
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setEditableProduct: (state, action: PayloadAction<Product | null>) => {
      state.editableProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products cases
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        fetchAllProducts.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )
      // Fetch all orders cases
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state, action: PayloadAction<OrderItem[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(
        fetchAllOrders.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )
      // Delete product cases
      .addCase(deleteProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProductById.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.products = state.products.filter(
            (product) => product._id !== action.payload
          );
        }
      )
      .addCase(
        deleteProductById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )
      // Find product by ID cases
      .addCase(findProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        findProductById.fulfilled,
        (state, action: PayloadAction<Product | null>) => {
          state.loading = false;
          if (action.payload) {
            state.editableProduct = action.payload;
          } else {
            state.editableProduct = null;
            alert("Product Not Found");
          }
        }
      )
      .addCase(
        findProductById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch product";
        }
      );
  },
});

export const { setEditableProduct } = adminSlice.actions;
export default adminSlice.reducer;
