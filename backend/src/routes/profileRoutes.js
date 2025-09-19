const express = require("express");
const authMiddleware = require("../middlewares/authMiddlware");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/view", authMiddleware, async (req, res) => {
  try {
    const { _id, userName, email, fullName, photoURL } = req.user;
    res.status(200).json({ _id, userName, email, fullName, photoURL });
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

profileRouter.put("/edit", authMiddleware, async (req, res) => {
  try {
    const allowedEditFields = ["fullName", "userName", "photoURL"];

    const data = Object.keys(req.body)
      .filter((key) => allowedEditFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

module.exports = profileRouter;
