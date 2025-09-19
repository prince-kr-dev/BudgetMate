import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

function Transactions() {
  const { dashboardData } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    if (dashboardData) fetchTransactions();
  }, [dashboardData]);
  const TxIcon = ({ type }) =>
    type === "income" ? (
      <ArrowUpRight className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDownLeft className="w-4 h-4 text-red-600" />
    );

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

  // console.log(transactions);

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 pt-20">All Transactions</h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && transactions.length === 0 && (
          <p className="text-center text-gray-500">No transactions found</p>
        )}

        {!loading && !error && transactions.length > 0 && (
          <div className="space-y-3">
            {transactions.reverse().map((tx, i) => (
              <div
                key={tx.id || i}
                className="bg-slate-100  rounded-lg p-4 flex justify-between items-center"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
