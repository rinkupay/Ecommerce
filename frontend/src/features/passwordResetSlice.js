import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

// Define the async thunk for password reset
export const resetPassword = createAsyncThunk(
  'passwordReset/resetPassword',
  async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/password/forgot', formData);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

// Create the password reset slice
const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    clearSuccessMessage(state) {
        state.successMessage = null;
  },
},

  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
          successMessage: null,
        };
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
          successMessage: action.payload,
          
        };
     
      })
      .addCase(resetPassword.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
          successMessage: "User not found", // Reset success message on rejection
        };
      });
  },
});

export default passwordResetSlice.reducer;
export const { clearSuccessMessage } = passwordResetSlice.actions;

