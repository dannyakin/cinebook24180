// middleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded');
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};


// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.userType !== "admin") {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized Admin" });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
