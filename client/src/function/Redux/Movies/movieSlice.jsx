// Import createSlice and createAsyncThunk from Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from "../../../utils/api";

// Define initial state
const initialState = {
  movies: [],
  status: "idle",
  error: null,
  movie: null,
};

// Define thunk for fetching all movies
export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async () => {
    const response = await getDataAPI("api/movies");
    return response.data;
  }
);

// Define thunk for fetching movies by ID
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await getDataAPI(`api/movies/${movieId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define thunk for adding a movie to the slide
export const addToSlide = createAsyncThunk(
  "movies/addToSlide",
  async (movieId) => {
    console.log(addToSlide);
    const response = await putDataAPI(`api/movies/${movieId}/slide`);
    return response.data;
  }
);

// Define thunk for posting a new movie
export const postMovie = createAsyncThunk(
  "movies/postMovie",
  async (movieData) => {
    const response = await postDataAPI("api/movies", movieData);
    return response.data;
  }
);

// Define thunk for deleting a movie
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movieId) => {
    await deleteDataAPI(`api/movies/${movieId}`);
    return movieId;
  }
);

// Create movie slice
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducer cases for getAllMovies
    builder.addCase(getAllMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movies = action.payload;
    });
    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Add reducer cases for fetchMovies
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movie = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Add reducer cases for addToSlide
    builder.addCase(addToSlide.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToSlide.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Update the movie object in state or any necessary logic
    });
    builder.addCase(addToSlide.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Add reducer cases for postMovie
    builder.addCase(postMovie.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postMovie.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movies.push(action.payload);
    });
    builder.addCase(postMovie.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Add reducer cases for deleteMovie
    builder.addCase(deleteMovie.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    });
    builder.addCase(deleteMovie.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default movieSlice.reducer;
