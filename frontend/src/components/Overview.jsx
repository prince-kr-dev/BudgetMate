import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  CreditCard,
  IndianRupee,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import TransactionAnalytics from "./TransactionAnalytics";

const Overview = () => {
  const { user, dashboardData, addTransaction } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(0);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const result = await dashboardData();
      const tx =
        result?.data ||
        result?.transactions ||
        result?.response?.data ||
        (Array.isArray(result) ? result : []);
      setTransactions(tx);
    } catch (err) {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Update balance whenever transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      let total = 0;
      transactions.forEach((tx) => {
        total +=
          tx.transactionType === "income"
            ? Number(tx.amount)
            : -Number(tx.amount);
      });
      setBalance(total);
    }
  }, [transactions]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatAmount = (amount, type) => {
    const value = Number(amount) || 0;
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
    return type === "income" ? `+${formatted}` : `-${formatted}`;
  };

  const TxIcon = ({ type }) =>
    type === "income" ? (
      <ArrowUpRight className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDownLeft className="w-4 h-4 text-red-600" />
    );

  const calculateMonthlyIncome = (transactions) => {
    const now = new Date();
    return transactions
      .filter((tx) => {
        if (tx.transactionType !== "income") return false;
        const date = new Date(tx.createdAt);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  };

  const calculateMonthlyExpense = (transactions) => {
    const now = new Date();
    return transactions
      .filter((tx) => {
        if (tx.transactionType !== "expense") return false;
        const date = new Date(tx.createdAt);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  };

  const monthlyIncome = calculateMonthlyIncome(transactions);
  const monthlyExpense = calculateMonthlyExpense(transactions);

  // ✅ Auto-refresh after adding a transaction
  const handleAddTransaction = async (allData) => {
    await addTransaction(allData);
    fetchTransactions(); // Refresh dashboard immediately
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-14">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 mt-1">
            Welcome back {user?.fullName || user?.userName || "User"}!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Cards */}
        <div className="flex flex-col md:flex-row md:justify-center gap-6 mb-8">
          {/* Total Balance */}
          <div className="bg-white rounded-xl p-6 px-10 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Balance
                </p>
                <p
                  className={`text-3xl font-bold mt-2 ${
                    balance < 10 ? "text-red-600" : "text-slate-900"
                  }`}
                >
                  ₹ {balance}
                </p>
                <span className="text-green-600 text-sm font-medium">
                  Stable financial status
                </span>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <IndianRupee className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Monthly Income */}
          <div className="bg-white rounded-xl p-6 px-10 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Monthly Income
                </p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ₹ {monthlyIncome}
                </p>
                <span className="text-green-600 text-sm font-medium">
                  Steady upward trend
                </span>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white rounded-xl p-6 px-10 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Monthly Expenses
                </p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  ₹ {monthlyExpense}
                </p>
                <span className="text-red-600 text-sm font-medium">
                  Slight dip in spending
                </span>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <TransactionAnalytics transactions={transactions} />

        {/* Transactions Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>

          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {!loading && !error && transactions.length === 0 && (
            <p className="text-center text-gray-500">No transactions found</p>
          )}

          {!loading && !error && transactions.length > 0 && (
            <div className="space-y-3">
              {transactions
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)
                .map((tx, i) => (
                  <div
                    key={tx.id || i}
                    className="bg-white rounded-lg p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <TxIcon type={tx.transactionType} />
                      <div>
                        <p className="font-medium">
                          {tx.description || "No description"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(tx.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold ${
                        tx.transactionType === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatAmount(tx.amount, tx.transactionType)}
                    </p>
                  </div>
                ))}

              {/* View All Button */}
              {transactions.length > 3 && (
                <div className="text-center mt-4">
                  <Link
                    to="/transactions"
                    className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    View All Transactions
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
