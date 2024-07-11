import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define your initial state
const initialState = {
    review: {},
    status: null,
    loading: false,
    error: null,
    message: null,
};

// Fetch product details thunk
const createReviewSlice = () => {
    const updateReview = createAsyncThunk(
        "review/productReview",
        async (data) => {
            try {
                const link = `http://localhost:4000/api/v1/review`;
                const response = await axios.put(link, data, { withCredentials: true });
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    );

    const reviewSlice = createSlice({
        name: "review",
        initialState,
        reducers: {
            clearMessage: (state) => {
                state.message = null;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(updateReview.pending, (state) => {
                    state.status = "pending";
                    state.loading = true;
                })
                .addCase(updateReview.fulfilled, (state, action) => {
                    state.status = "success";
                    state.loading = false;
                    state.review = action.payload; // update state.review instead of state.products
                    state.message = action.payload.message;
                })
                .addCase(updateReview.rejected, (state, action) => {
                    state.loading = false;
                    state.status = "rejected";
                    state.error = action.payload;
                    state.message = action.payload.message;
                });
        }
    });

    return {
        slice: reviewSlice,
        actions: { updateReview, ...reviewSlice.actions }, // Spread reviewSlice.actions to include clearMessage
    };
}

const productReviewBuilder = createReviewSlice();
export default productReviewBuilder.slice.reducer;
export const { updateReview, clearMessage } = productReviewBuilder.actions;
