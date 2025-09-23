import { useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddTransaction() {
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");

  const allData = { transactionType, amount, paymentMethod, description };

  const { addTransaction } = useAuth();

  const navigate = useNavigate();
  const handleClick = async () => {
    if (!transactionType || !amount || !paymentMethod || !description) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    addTransaction(allData);
    navigate("/dashboard");
    toast.success("Transaction added successfully");
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 p-4">
        <div className="max-w-md mx-auto bg-slate-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Add New Transaction
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Fill in the details below to add a new income or expense.
          </p>

          <div className="space-y-4">
            {/* Amount Field */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  id="amount"
                  placeholder="0.00"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Groceries, Monthly Salary, Rent..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                required
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                <option value="">Select a category</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Transaction type Field */}
            <div>
              <label
                htmlFor="transactionType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Transaction Type
              </label>
              <select
                id="transactionType"
                required
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                <option value="">Select a type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleClick}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors mt-6"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
