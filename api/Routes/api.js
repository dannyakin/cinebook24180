const express = require("express");
const router = express.Router();
const userController = require("../src/controller/user");
const movieController = require("../src/controller/movies");
const middleware = require("../src/middleware/auth");
const {
  getAllTickets,
  getTicketById,
  bookTicket,
  getAllUserTickets,
} = require("../src/controller/book");

// Register a new user
router.post("/register", userController.registerUser);

// Login user
router.post("/login", userController.loginUser);
router.get("/users", userController.getAllUsers);

// Get user profile
router.get(
  "/profile",
  middleware.authenticateUser,
  userController.getUserProfile
);

// Get all movies
router.post(
  "/movies",
  middleware.authenticateAdmin,
  movieController.createMovie
);

// Get all movies
router.get("/movies", movieController.getAllMovies);

// Get a movie by ID
router.get("/movies/:id", movieController.getMovieById);
router.delete("/movies/:id", movieController.deleteMovie);
// Delete a movie by ID
router.delete(
  "/movies/:id",
  middleware.authenticateAdmin,
  movieController.deleteMovie
);

router.put("/movies/:id/slide", movieController.toggleSlide);

// Get all users (admin-only route)
router.get("/users", middleware.authenticateAdmin, userController.getAllUsers);


router.get("/tickets", middleware.authenticateUser, getAllTickets); // Route to get all tickets
router.get("/tickets/:id", middleware.authenticateUser, getTicketById); // Route to get a ticket by ID
router.post("/tickets/", middleware.authenticateUser, bookTicket);
router.get("/userTickets", middleware.authenticateUser, getAllUserTickets);
module.exports = router;
