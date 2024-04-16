import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./Movies/movieSlice";
import authReducer from "./Auth/AuthSlice";
import ticketReducer from "./Tickets/ticketSlice";
import userReducer from "./User/UserSlice";

// Import other reducers as needed

const rootReducer = combineReducers({
  movie: movieReducer,
  auth: authReducer,
  ticket: ticketReducer,
  users: userReducer
  // Add other reducers here
});

export default rootReducer;
