import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userDetails: null,
  status: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  message : null
};

const baseURL = "http://localhost:4000/api/v1";

// Async thunk for login action
const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/login`, userData, { withCredentials: true });
   
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
   
  }
);

// Async thunk for loading user
const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/me`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout user
const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async () => {
    try {
      const response = await axios.post(`${baseURL}/logout`, "", { withCredentials: true });
      return response.data;
      
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for UpdateUser action
const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/profile/update`, user, { withCredentials: true });
      return response.data;
      // console.log(response)
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
   
  }
);




// Async thunk for Profile UpdateUser action
const updatePicture = createAsyncThunk(
  "user/updatePicture",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/profile/pic/update`,formData, { withCredentials: true });
      return response.data;
      // console.log(response)
      
    } catch (error) {
      return rejectWithValue(error);
    }
   
  }
);



// <<<<<<<<<<<<<<<<<<============ update password =====================>>>>>>>>>>>>>>>>>>
const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/password/update`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




const userSlice = createSlice({
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
      .addCase(loginUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
       
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.isLoggedIn = true;
        state.userDetails = action.payload;
        state.error=null;
        state.message = "Logged in Successfully!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
        state.message = "Invalid Email or Password";
        
      })
      // Load user reducers
      .addCase(loadUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.isLoggedIn = false;
        state.message = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.isLoggedIn = true;
        state.userDetails = action.payload;
        state.message = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.isLoggedIn = false;
        state.error = action.payload;
        state.message = null;
      })
      // Logout user reducers
      .addCase(logoutUser.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.message = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.isLoggedIn = false;
        state.userDetails = null;
        state.message = action.payload.message;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.isLoggedIn = false;
        state.error = action.payload;
        state.message = action.payload.message
      })

         // Update user reducers
         .addCase(updateUser.pending, (state) => {
          
          state.status = "pending";
          state.loading = true;
          state.message = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.status = "success";
          state.loading = false;
          state.isLoggedIn = true;
          state.userDetails = action.payload;
          state.message = action.payload.message;
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.loading = false;
          state.status = "rejected";
          state.isLoggedIn = true;
          state.error = action.payload;
          state.message = "User Update Failed"
        })


           // Update user Picture reducers
           .addCase(updatePicture.pending, (state) => {
          
            state.status = "pending";
            state.loading = true;
            state.message = null;
          })
          .addCase(updatePicture.fulfilled, (state, action) => {
            state.status = "success";
            state.loading = false;
            state.isLoggedIn = true;
            state.userDetails = action.payload;
            state.message = action.payload.message;
          })
          .addCase(updatePicture.rejected, (state, action) => {
            state.loading = false;
            state.status = "rejected";
            state.isLoggedIn = true;
            state.error = action.payload;
            state.message = "Picture Update Failed"
          })


          .addCase(updatePassword.pending, (state) => {
            state.status = "pending";
            state.loading = true;
            state.message = null;
          })
          .addCase(updatePassword.fulfilled, (state, action) => {
            state.status = "success";
            state.loading = false;
            // Assuming the response contains updated user details
            state.userDetails = action.payload;
            state.message = "Password Updated Successfully";
          })
          .addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.status = "rejected";
            state.error = action.payload;
            state.message = "Current Password Wrong!";
          });

  },
});

export default userSlice.reducer;
export { loginUser, loadUser, logoutUser,updateUser , updatePicture,updatePassword };
export const { resetMessage } = userSlice.actions;



