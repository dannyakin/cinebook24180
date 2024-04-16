const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  seatsBooked: [{ type: Schema.Types.ObjectId, ref: "Seat" }],
  totalPrice: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
