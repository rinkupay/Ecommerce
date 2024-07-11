import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {

  status: null,
  loading: false,
  error: null,
  message:null,
  
};

const baseURL = "http://localhost:4000/api/v1";

// Async thunk for Register action
const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/register`, formData,{withCredentials:true});
      return response.data;
      
    } catch (error) {
       // Returning a structured error object
       return rejectWithValue({ message: error.response.data.message });
      }
    
   
  }
);

const userRegisterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login user reducers
      .addCase(registerUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.error=null;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
        state.message = action.payload.message;
      })
     
  },
});

export default userRegisterSlice.reducer;
export { registerUser };
