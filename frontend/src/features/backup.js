import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/api/v1";

// Async thunk for login action
const loginUser = createAsyncThunk("user/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for loading user
const loadUser = createAsyncThunk("user/loadUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for logout user
const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    const response = await axios.post(`${baseURL}/logout`, "", { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk for UpdateUser action
const updateUser = createAsyncThunk("user/updateUser", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${baseURL}/profile/update`, user, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    status: "idle",
    loading: false,
    error: null,
    isLoggedIn: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Common pending case
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") && ["user/loginUser", "user/loadUser", "user/logoutUser", "user/updateUser"].includes(action.type),
        (state) => {
          state.status = "pending";
          state.loading = true;
          state.message = null;
          state.error = null;
        }
      )
      // Common fulfilled case
      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") && ["user/loginUser", "user/loadUser", "user/logoutUser", "user/updateUser"].includes(action.type),
        (state, action) => {
          state.status = "success";
          state.loading = false;
          state.error = null;
          state.message = action.payload.message || null;
        }
      )
      // Common rejected case
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") && ["user/loginUser", "user/loadUser", "user/logoutUser", "user/updateUser"].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.error = action.payload;
          state.message = action.payload.message || "An error occurred";
        }
      )
      // Specific fulfilled case for updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userDetails = action.payload.user || state.userDetails; // Update userDetails if available in payload
      })
  },
});

export default userSlice.reducer;
export { loginUser, loadUser, logoutUser, updateUser };
