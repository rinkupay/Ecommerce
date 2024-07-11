import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define your initial state
const initialState = {
  order: null, // Change orders to order as we fetch details of a single order
  status: null,
  loading: false,
  error: null,
};

// Define a builder function for creating product slices
const createOrderDetailsSlice = (initialState) => {
  // Fetch product thunk
  const fetchOrderDetails = createAsyncThunk(
    "order/fetchOrderDetails", // Change from "orders/fetchOrdersDetails" to "order/fetchOrderDetails" for consistency
    async ({id:id}) => {
      try {

        const link = `http://localhost:4000/api/v1/order/${id}`;
        const response = await axios.get(link,{withCredentials:true});
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  // Create the product slice with extra reducers
  const orderDetailsSlice = createSlice({
    name: "order", // Change from "orders" to "order" for consistency
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchOrderDetails.pending, (state) => {
          state.status = "pending";
          state.loading = true;
        })
        .addCase(fetchOrderDetails.fulfilled, (state, action) => {
          state.status = "success";
          state.loading = false;
          state.order = action.payload; // Change from state.orders to state.order
          state.error = null; // Clear error on successful fetch
        })
        .addCase(fetchOrderDetails.rejected, (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.error = action.error.message; // Store error message
        });
    },
  });

  return {
    slice: orderDetailsSlice,
    actions: { fetchOrderDetails },
  };
};

// Create the product slice using the builder function
const orderDetailsBuilder = createOrderDetailsSlice(initialState);

// Export the reducer and actions
export default orderDetailsBuilder.slice.reducer;
export const { fetchOrderDetails } = orderDetailsBuilder.actions;
