import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDataAPI, postDataAPI } from "../../../utils/api";

// Async thunk for creating a ticket
export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await postDataAPI("api/tickets", ticketData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching all tickets
export const fetchAllTickets = createAsyncThunk(
  "tickets/fetchAllTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDataAPI("api/tickets");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching tickets for a specific user
export const fetchUserTickets = createAsyncThunk(
  "tickets/fetchUserTickets",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getDataAPI(`api/tickets`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice for ticket management
const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    allTickets: [],
    userTickets: [],
    loading: false,
    error: null,
    ticket: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for creating a ticket
    builder.addCase(createTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.ticket = action.payload;
      // Optionally, update the state to include the newly created ticket
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Reducer for fetching all tickets
    builder.addCase(fetchAllTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.allTickets = action.payload;
    });
    builder.addCase(fetchAllTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Reducer for fetching tickets for a specific user
    builder.addCase(fetchUserTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userTickets = action.payload;
    });
    builder.addCase(fetchUserTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default ticketSlice.reducer;
