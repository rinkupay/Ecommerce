import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define your initial state
const initialState = {
  orders: [],
  status: null,
  loading: false,
  error: null,
};

// Define a builder function for creating product slices
const createOrderSlice = (initialState) => {
  // Fetch product thunk
  const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async () => {
      try {
        const link = `http://localhost:4000/api/v1/orders/me`;

        const response = await axios.get(link,{ withCredentials: true });
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  // Create the product slice with extra reducers
  const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchOrders.pending, (state) => {
          state.status = "pending";
          state.loading = true;
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
          state.status = "success";
          state.loading = false;
          state.orders = action.payload.orders;
          state.error = null; // Clear error on successful fetch
        })
        .addCase(fetchOrders.rejected, (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.error = action.error.message; // Store error message
        });
    },
  });

  return {
    slice: orderSlice,
    actions: { fetchOrders },
  };
};

// Create the product slice using the builder function
const orderBuilder = createOrderSlice(initialState);

// Export the reducer and actions
export default orderBuilder.slice.reducer;
export const { fetchOrders } = orderBuilder.actions;
