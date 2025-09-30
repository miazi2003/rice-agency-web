import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const stats = [
    {
      title: "Total Customers",
      value: 12500,
      change: "+1.2%",
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Total Products",
      value: 320,
      change: "+18 New",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Product Price",
      value: "$1.2M",
      change: "-0.5%",
      color: "bg-green-100 text-green-600",
    },
  ];

  const chartData = {
    labels: ["Electronics", "Clothing", "Home", "Books", "Accessories"],
    datasets: [
      {
        label: "Products by Category",
        data: [120, 80, 60, 40, 20],
        backgroundColor: [
          "#8b5cf6", // violet
          "#3b82f6", // blue
          "#10b981", // green
          "#f59e0b", // yellow
          "#ef4444", // red
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-violet-700 text-center">💜 Product Dashboard</h1>
        <p className="text-gray-600 text-center">Quick overview of business performance</p>
      </header>

      {/* Flex Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Stats */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-700">{item.title}</h2>
              <p className="text-3xl font-bold mt-2">{item.value}</p>
              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${item.color}`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side - Chart */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            📊 Products by Category
          </h2>
          <div className="h-80">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
