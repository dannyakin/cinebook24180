const mongoose = require("mongoose");

// Define the schema for the booking information
const bookingSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie", // reference to the Movie collection
  },
  seat: {
    type: [String],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  showingDate: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create the Mongoose model based on the schema
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
