import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: null,
  status: null,
  loading: false,
  error: null,
  message: null,
};

const baseURL = "http://localhost:4000/api/v1";

// GET ALL USERS FOR ADMIN DASHBOARD
const adminGetUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/admin/users`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user reducers
      .addCase(adminGetUsers.pending, (state) => {
        state.status = "pending";
        state.loading = true;

        state.error = null;
      })
      .addCase(adminGetUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(adminGetUsers.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
        state.message = "Invalid Email or Password";
      });
  },
});

export default adminUserSlice.reducer;
export { adminGetUsers };
export const { resetMessage } = adminUserSlice.actions;
