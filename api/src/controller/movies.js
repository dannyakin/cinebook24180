const cloudinary = require("cloudinary").v2;
const Movie = require("../models/movie");
const multer = require("multer");
exports.createMovie = async (req, res) => {
  try {
    // Upload image to Cloudinary
    // Create new movie with Cloudinary image URL
    const newMovie = new Movie({
      title: req.body.title,
      description: req.body.description,
      releaseDate: req.body.releaseDate,
      age: req.body.age,
      seat: req.body.seat,
      time: req.body.showTime,
      genres: req.body.genres,
      locations: req.body.locations,
      showingDate: req.body.showingDate,
      image: req.body.image // Store Cloudinary image URL in database
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to edit an existing movie
exports.editMovie = async (req, res) => {
  try {
    const movieId = req.params.id; // Assuming the movie ID is passed as a parameter in the request URL
    const updatedMovie = {
      title: req.body.title,
      description: req.body.description,
      releaseDate: req.body.releaseDate,
      age: req.body.age,
      seat: req.body.seat,
      time: req.body.showTime,
      genres: req.body.genres,
      locations: req.body.locations,
      showingDate: req.body.showingDate,
      image: req.body.image,
      slide: req.body.slide, // Store Cloudinary image URL in database
    };

    // Update the movie with the provided data
    const result = await Movie.findByIdAndUpdate(movieId, updatedMovie, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error editing movie:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.toggleSlide = async (req, res) => {
  try {console.log("movie.slide");
    const movieId = req.params.id;

    // Get the movie by ID
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Toggle the slide property
    movie.slide = !movie.slide;

    // Save the updated movie
    const updatedMovie = await movie.save();

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Error toggling movie slide:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Controller function to get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error getting all movies:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error getting movie by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to delete a movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add Multer middleware to the routes that need it