import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define your initial state
const initialState = {
    // productDetails: {}, // Add productDetails to the initial 
    products:{},
    status: null,
    loading: false, // Set loading to false initially
    error: null,
};

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
export default productDetailsBuilder.slice.reducer;
export const { fetchProductDetails } = productDetailsBuilder.actions;

