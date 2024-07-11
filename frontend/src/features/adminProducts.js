import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define your initial state
const initialState = {
  products: [],
  status: null,
  loading: true,
  error: null,
  // productDetails: null, // Add productDetails to the initial state
};

// Define a builder function for creating product slices
const createAdminProductSlice = (initialState) => {
  // Fetch product thunk
  const fetchAdminProducts = createAsyncThunk(
    "products/fetchAdminProducts",
    async () => {
      try {
        let link = `http://localhost:4000/api/v1/admin/products`;
        const response = await axios.get(link, { withCredentials: true });
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  // Create product thunk (ADMIN)
  const createProduct = createAsyncThunk(
    "product/createProduct",
    async (formData) => {
      try {
        let link = `http://localhost:4000/api/v1/admin/product/new`;
        const response = await axios.post(link, formData, { withCredentials: true });
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );
  // Update product thunk (ADMIN)
  const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({editProductId,formData}) => {
      try {
        let link = `http://localhost:4000/api/v1/product/${editProductId}`;
        const response = await axios.put(link,formData , { withCredentials: true });
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  // Delete a product (ADMIN)
  const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
      try {
        let link = `http://localhost:4000/api/v1/product/${id}`;
        const response = await axios.delete(link, { withCredentials: true });
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  // Create the product slice with extra reducers
  const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      clearMessage: (state) => {
        state.message = null;
      },
      clearError:(state) => {
        state.error = null;

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAdminProducts.pending, (state) => {
          state.status = "pending";
          state.loading = true;
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action) => {
          state.status = "success";
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchAdminProducts.rejected, (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.error = action.error.message;
        })

        // Create Product
        .addCase(createProduct.pending, (state) => {
          state.status = "pending";
          state.loading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.status = "success";
          state.loading = false;
          state.error = null;
          state.products = action.payload;
          state.message = action.payload.message;
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.error = action.error.message;
          state.message = "Required All fields";
        })

         // Update Product
         .addCase(updateProduct.pending, (state) => {
          state.status = "pending";
          state.loading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.status = "success";
          state.loading = false;
          state.error = null;
          state.products = action.payload;
          state.message = action.payload.message;
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.error = "Server Error Try Later";
          
        })

        // Delete A Product (ADMIN)
        .addCase(deleteProduct.pending, (state) => {
          state.status = "pending";
          state.loading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.status = "success";
          state.loading = false;
          state.error = null;
          state.products = action.payload;
          state.message = null;
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.error = action.error.message;
          state.message = "Unable to delete";
        });
    },
  });

  return {
    slice: productSlice,
    actions: { fetchAdminProducts, createProduct, deleteProduct,updateProduct, clearMessage: productSlice.actions.clearMessage, clearError: productSlice.actions.clearError },
  };
};

// Create the product slice using the builder function
const adminProductBuilder = createAdminProductSlice(initialState);

// Export the reducer and actions
export default adminProductBuilder.slice.reducer;
export const { fetchAdminProducts, createProduct, deleteProduct, clearMessage ,updateProduct,clearError } = adminProductBuilder.actions;
