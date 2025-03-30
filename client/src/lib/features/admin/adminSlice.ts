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
  summary: Summary | null;
}

export interface Summary {
  totalOrders: number;
  totalAmount: number;
  productOrders: {
    [key: string]: number;
  };
}

const initialState: AdminState = {
  products: [],
  orders: [],
  editableProduct: null,
  loading: false,
  error: null,
  summary: {
    totalOrders: 0,
    totalAmount: 0,
    productOrders: {},
  },
};

// Async function to fetch all products
export const editProduct = createAsyncThunk<
  Product,
  { id: string; updates: Partial<Product> },
  { rejectValue: string }
>("admin/editProduct", async ({ id, updates }, { rejectWithValue }) => {
  const token = Cookies.get("authToken");
  try {
    const response = await axios.put<{ data: Product }>(
      `${process.env.NEXT_PUBLIC_ROOT_API}/product/${id}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update product"
    );
  }
});

export const fetchAllProducts = createAsyncThunk<
  Product[],
  Record<string, string> | void,
  { rejectValue: string }
>("admin/fetchAllProducts", async (params = {}, { rejectWithValue }) => {
  try {
    // Ensure params is treated as Record<string, string>
    const searchParams = params as Record<string, string>;

    // If there's a search parameter, use the search endpoint
    if (searchParams?.search) {
      const response = await axios.get<{ data: Product[] }>(
        `${
          process.env.NEXT_PUBLIC_ROOT_API
        }/product/search?query=${encodeURIComponent(searchParams.search)}`
      );
      return response.data.data;
    }

    // Otherwise, use the regular products endpoint
    const response = await axios.get<{ data: Product[] }>(
      `${process.env.NEXT_PUBLIC_ROOT_API}/product`,
      { params: searchParams }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
});

// Corrected fetchSummary to return Summary type
export const fetchSummary = createAsyncThunk<
  Summary,
  void,
  { rejectValue: string }
>("admin/fetchSummary", async (_, { rejectWithValue }) => {
  const token = Cookies.get("authToken") as string | undefined;

  try {
    const response = await axios.get<{ data: Summary }>(
      `${process.env.NEXT_PUBLIC_ROOT_API}/orders/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch summary"
    );
  }
});

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
  string,
  string,
  { rejectValue: string }
>("admin/deleteProductById", async (id: string, { rejectWithValue }) => {
  try {
    const token = Cookies.get("authToken");
    await axios.delete(`${process.env.NEXT_PUBLIC_ROOT_API}/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error: any) {
    console.error("Error deleting product by ID:", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete product"
    );
  }
});

export const deleteVariant = createAsyncThunk<
  { productId: string; variantId: string },
  { productId: string; variantId: string },
  { rejectValue: string }
>(
  "admin/deleteVariant",
  async ({ productId, variantId }, { rejectWithValue, dispatch }) => {
    const token = Cookies.get("authToken");
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_ROOT_API}/product/${productId}/variants/${variantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After deletion, refetch the product to update the state
      await dispatch(findProductById(productId));
      return { productId, variantId };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete variant"
      );
    }
  }
);

export const editVariant = createAsyncThunk<
  { productId: string; variantId: string },
  {
    productId: string;
    variantId: string;
    updates: { size: string[]; stock: number };
  },
  { rejectValue: string }
>(
  "admin/editVariant",
  async ({ productId, variantId, updates }, { rejectWithValue, dispatch }) => {
    const token = Cookies.get("authToken");
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_ROOT_API}/product/${productId}/variants/${variantId}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refetch the product to update the state
      await dispatch(findProductById(productId));
      return { productId, variantId };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update variant"
      );
    }
  }
);

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
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      // Fetch summary cases
      .addCase(fetchSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSummary.fulfilled,
        (state, action: PayloadAction<Summary>) => {
          state.loading = false;
          state.summary = action.payload;
        }
      )
      .addCase(fetchSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
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
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
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
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
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
      .addCase(findProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch product";
      })

      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        editProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.editableProduct = action.payload;
          state.products = state.products.map((p) =>
            p._id === action.payload._id ? action.payload : p
          );
        }
      )
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      .addCase(deleteVariant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteVariant.fulfilled,
        (
          state,
          action: PayloadAction<{ productId: string; variantId: string }>
        ) => {
          state.loading = false;
        }
      )
      .addCase(deleteVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete variant";
      })
      .addCase(editVariant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        editVariant.fulfilled,
        (
          state,
          action: PayloadAction<{ productId: string; variantId: string }>
        ) => {
          state.loading = false;
        }
      )
      .addCase(editVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update variant";
      });
  },
});

export const { setEditableProduct } = adminSlice.actions;
export default adminSlice.reducer;
