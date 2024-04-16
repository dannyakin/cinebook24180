const dotenv = require("dotenv");
const express = require("express");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Configure dotenv
dotenv.config();

// Create an Express app
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Middleware to parse JSON requests
app.use(express.json());
// Use cookie-parser middleware
app.use(cookieParser());

// Using Routes
app.use("/api", require("./Routes/api"));

const PORT = process.env.APP_PORT || 8000;
mongoose
  .connect(process.env.DB_USER)
  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting", err));
