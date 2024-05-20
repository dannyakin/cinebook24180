const Booking = require("../models/booked"); // Assuming you have a Booking model
const Movie = require("../models/movie");
const User = require("../models/user");

const bookTicket = async (req, res) => {
  const { movieId, seat, location, time, amount, showingDate } = req.body;
  const user = req.user;
  console.log(user);

  try {
    // Fetch the movie details from the database
    let movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update seat statuses in memory
    for (const section of movie.seat) {
      for (const s of section.seats) {
        if (seat.includes(s.id)) {
          // Update the status of the seat in the current section
          s.status = "booked";
        }
      }
    }

    let newMovie = await Movie.findByIdAndUpdate(movieId, { seat: movie.seat });

    // Save the updated movie document back to the database

    // Create a new booking entry
    const booking = new Booking({
      movie: movieId,
      seat,
      location,
      amount,
      time,
      showingDate,
      user: user._id,
      // Add other relevant booking details here
    });
    await booking.save();

    // Respond with the updated movie document and the booking information
    res.status(200).json({
      message: "Seats updated and booking created successfully",
      movie,
      booking,
    });
  } catch (error) {
    console.error("Error updating seats and creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Booking.find().populate("movie");
    console.log(tickets);
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Booking.find();
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUserTickets = async (req, res) => {
  const user = req.user;
  console.log(user._id);

  try {
    // Find all tickets where the user ID matches
    const userTickets = await Booking.find({ user: user._id }).populate(
      "movie"
    );

    console.log(userTickets);

    // If there are no tickets, respond with a message
    if (userTickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tickets found for this user" });
    }

    // Respond with the tickets belonging to the user
    res.status(200).json(userTickets);
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  bookTicket,
  getAllUserTickets,
};
