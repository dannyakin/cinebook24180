const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register a new user// Register a new user
const registerUser = async (req, res) => {
  try {
    
    const { fullName, email, password, userType } = req.body;

    // Check if fullName and email are provided
    if (!fullName || !email) {
      return res.status(400).json({ message: "Full name and email are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      userType, // Include user type in the user document
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token with user ID and user type in the payload
    const token = jwt.sign(
      { userId: newUser._id, userType: newUser.userType },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { ...newUser.toObject(), password: undefined },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token with user ID and user type in the payload
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res
      .status(200)
      .json({ token, user: { ...user.toObject(), password: undefined } });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while logging in user" });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId from JWT
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user profile:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting user profile" });
  }
};

// Get all users (for admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting all users:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting all users" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, getAllUsers };
