const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seatNumber: { type: String, required: true },
  movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  isBooked: { type: Boolean, default: false },
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
