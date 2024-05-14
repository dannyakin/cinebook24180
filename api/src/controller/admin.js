const Booking = require("../models/booked"); // Assuming you have a Booking model
const Movie = require("../models/movie");
const User = require("../models/user");

const fetchDashboard = async (req, res) => {
  try {
    const users = await User.find();
    const movies = await Movie.find();
    const tickets = await Booking.find();

    res.status(200).json({users, movies, tickets})
  } catch (error) {
    console.log(error)
  }
};


module.exports = {fetchDashboard}