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
const createProductSlice = (initialState) => {
  // Fetch product thunk
  const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ keyword = "", currentPage, price = [0, 20000], category,ratings=0 }) => {
      try {
        let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
          link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const response = await axios.get(link);
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
    reducers: {},
    extraReducers: (builder) => {                                          
      builder                                    
        .addCase(fetchProducts.pending, (state) => {
          state.status = "pending";
          state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = "success";
          state.loading = false;
          state.products = action.payload;
          state.productCount = action.payload.productCount;
          state.resultPerPage = action.payload.resultPerPage;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.error = action.error.message;
        });
    },
  });

  return {
    slice: productSlice,
    actions: { fetchProducts },
  };
};

// Create the product slice using the builder function
const productBuilder = createProductSlice(initialState);

// Export the reducer and actions
export default productBuilder.slice.reducer;
export const { fetchProducts } = productBuilder.actions;





// // Product Details
// Fetch product details thunk
const createProductDetailsSlice = (initialState) => {
  // Fetch Product details
  const fetchProductDetails = createAsyncThunk(
      "products/fetchProductDetails",
      async (id) => {
          try {
              let link = `http://localhost:4000/api/v1/product/${id}`
              const response = await axios.get(link);
              return response.data;
          } catch (error) {
              throw error;

          }
      }
  )
  // Create the productDetails slice with extra reducers
  const productDetailsSlice = createSlice({
      name: "products",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
          builder
              .addCase(fetchProductDetails.pending, (state) => {
                  state.status = "pending";
                  state.loading = true;
              })


              .addCase(fetchProductDetails.fulfilled, (state, action) => {
                  state.status = "success";
                  state.loading = false;
                  state.products = action.payload;

              })
              .addCase(fetchProductDetails.rejected, (state, action) => {
                  state.loading = false;
                  state.status = "rejected";
                  state.error = action.error.message;
              });
      }
  });

  return {
      slice: productDetailsSlice,
      actions: { fetchProductDetails },
  };

}



const productDetailsBuilder = createProductDetailsSlice(initialState);
// Now, you can add this reducer to your Redux store and use it in your application.

// Export the reducer and actions
export const productDetailsReducer =  productDetailsBuilder.slice.reducer;
export const { fetchProductDetails } = productDetailsBuilder.actions;