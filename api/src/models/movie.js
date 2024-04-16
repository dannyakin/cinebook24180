const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genres: { type: Array, required: true },
  locations: { type: Array, required: true },
  seat: { type: Array, required: true },
  age: { type: String },
  image: { type: String, required: true },
  time: { type: Array, required: true },
  showingDate: { type: Array, required: true },
  slide: { type: Boolean, required: true , default: false},
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
