import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  status: null,
  loading: false,
  error: null,
  message: null,
};

const baseURL = "http://localhost:4000/api/v1";

// Async thunk for cart action
const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/mycart`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add to Cart
const addCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/cart`,cartData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Delete cart item
const removeCartItem = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseURL}/mycart/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
        state.message = "Server Error";
      })

// Add to Cart
      .addCase(addCart.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
      
        state.message = action.payload.message;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
        state.message = "Server Error";
      })


      // Delete From Cart
      .addCase(removeCartItem.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
      
        state.message = "Item removed from cart";
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
        state.message = "Server Error";
      });
  },
});

export default cartSlice.reducer;
export { fetchCart ,addCart,removeCartItem };
export const { clearMessage } = cartSlice.actions;
