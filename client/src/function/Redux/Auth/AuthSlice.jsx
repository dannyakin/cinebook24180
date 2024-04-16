import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { postDataAPI } from "../../../utils/api";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Stringify user data before sending

      const response = await postDataAPI("api/register", userData);
      // Save user details and token in cookies
      Cookies.set("currentUser", JSON.stringify(response.data.user));
      Cookies.set("token", response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Stringify user data before sending

      const response = await postDataAPI("api/login", userData);
      // Save user details and token in cookies
      Cookies.set("currentUser", JSON.stringify(response.data.user));
      Cookies.set("token", response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tokenData = Cookies.get("token") ? Cookies.get("token") : null;
const userData = Cookies.get("currentUser");
const currentUserCookie = userData
  ? JSON.parse(Cookies.get("currentUser"))
  : null;

// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: currentUserCookie,
    isAuthenticated: tokenData ? true : false,
    token: tokenData,
    loading: false,
    error: null,
  },
  reducers: {
    // Action to clear authentication state
    clearAuthState: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Reducer for user registration
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Reducer for user login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearAuthState } = authSlice.actions;

export default authSlice.reducer;
