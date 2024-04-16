import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersAPI, getDataAPI } from "../../../utils/api"; // Import your API function for fetching all users

// Define initial state
const initialState = {
  users: [],
  status: "idle",
  error: null,
};

// Define thunk for fetching all users
export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await getDataAPI("api/users"); // Call your API function to fetch all users
  return response.data;
});

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducer cases for getAllUsers
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
