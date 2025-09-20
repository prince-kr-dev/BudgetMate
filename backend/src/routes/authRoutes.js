// routes/authRoutes.js
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// Signup
authRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check username/email
    if (await User.findOne({ userName })) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate password
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Enter strong password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "Signup successful", token, data: user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        photoURL: user.photoURL,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = authRouter;
