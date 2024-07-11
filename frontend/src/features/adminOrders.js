import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  status: null,
  loading: false,
  error: null,
  message: null,
};

const baseURL = "http://localhost:4000/api/v1";

// Async thunk for fetching all orders
const allOrders = createAsyncThunk(
  "admin/allOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/admin/orders`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminUserOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.orders = action.payload; // Update orders with fetched data
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
        state.message = "Server Error";
      });
  },
});

export default adminUserOrderSlice.reducer;
export { allOrders };
export const { resetMessage } = adminUserOrderSlice.actions;
