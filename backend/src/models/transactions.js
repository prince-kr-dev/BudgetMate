const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference to the User model
      required: true,
    },
    transactionType:{
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    amount:{
      type: Number,
      required: true,
      min:0
    },
    paymentMethod:{
      type:String,
      enum:["Cash","Credit Card","Debit Card","Bank Transfer","UPI","Other"]
    },
    description:{
      type:String,
      trim:true,
      default: "This is default description for transaction"
    }

  },
  { timestamps: true }
);

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;