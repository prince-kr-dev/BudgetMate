const express = require("express");
const authMiddleware = require("../middlewares/authMiddlware");
const Transactions = require("../models/transactions");
const mongoose = require("mongoose");

const transactionRouter = express.Router();

transactionRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const { transactionType, amount, paymentMethod, description } = req.body;

    const transaction = new Transactions({
      user: req.user._id,
      transactionType,
      amount,
      paymentMethod,
      description,
    });

    await transaction.save();

    res.status(201).json({
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (err) {
    res.status(400).send("Failed to add transaction " + err);
  }
});

transactionRouter.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const allTransactions = await Transactions.find({ user: loggedInUserId });

    res.status(200).json({
      message: "Transaction fetched",
      data: allTransactions,
    });
  } catch (err) {
    res.status(400).send("Failed to load transaction " + err);
  }
});

transactionRouter.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid transaction ID format" });
    }

    const updatedTransaction = await Transactions.findOneAndUpdate(
      { _id: id, user: req.user._id }, //if both matched
      req.body,
      {
        new: true,
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (err) {
    res.status(400).send("Failed to update transaction " + err);
  }
});

transactionRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid transaction ID format" });
    }

    const deletedData = await Transactions.findOneAndDelete(
      {_id:id, user: req.user._id}
    )

    if (!deletedData) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message:"Transaction deleted successfully",
      data: deletedData
    })


  } catch (err) {
    res.status(400).send("Failed to delete transaction " + err);
  }
});

module.exports = transactionRouter;