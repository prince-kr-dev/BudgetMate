import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

const TransactionAnalytics = ({transactions}) => {
  // Use internal sample data
  const data = transactions;

  // Compute analytics
  const analyticsData = useMemo(() => {
    const income = data
      .filter((t) => t.transactionType === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = data
      .filter((t) => t.transactionType === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const donutData = [
      { name: "Income", value: income, color: "#10B981" },
      { name: "Expenses", value: expenses, color: "#EF4444" },
    ];

    const dailyData = data
      .reduce((acc, t) => {
        const date = new Date(t.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const existing = acc.find((item) => item.date === date);
        if (existing) {
          existing.income +=
            t.transactionType === "income" ? Number(t.amount) : 0;
          existing.expense +=
            t.transactionType === "expense" ? Number(t.amount) : 0;
        } else {
          acc.push({
            date,
            income: t.transactionType === "income" ? Number(t.amount) : 0,
            expense: t.transactionType === "expense" ? Number(t.amount) : 0,
          });
        }
        return acc;
      }, [])
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return { income, expenses, donutData, dailyData };
  }, [data]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const DonutTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-gray-500">
            {(
              (payload[0].value /
                (analyticsData.income + analyticsData.expenses)) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Income vs Expenses
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.donutData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily data Bar Chart */}
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Daily data
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.dailyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#10B981"
                  name="Income"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  fill="#EF4444"
                  name="Expenses"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionAnalytics;
