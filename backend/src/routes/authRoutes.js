const express = require("express");
const User = require("../models/user");

const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    //check if userName already present
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //check if email already present
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //validate password is strong or not
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Enter strong password",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User added successfully",
      data: user,
      token
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "fallbackSecretKey",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // ✅ Store token in cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // HTTPS only
    //   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // cross-site in prod
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });


    // Also return user data
    res.status(200).json({
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        fullName:user.fullName,
        userName: user.userName,
        email: user.email,
        photoURL:user.photoURL
      },
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .send("User Logged out successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

module.exports = authRouter;