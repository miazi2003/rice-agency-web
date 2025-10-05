import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";


import CountUp from "react-countup";
import { AuthContext } from "../../context/AuthContext";
import NotificationsTable from "../../component/data grid/DataGrid";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {

  const {user} = useContext(AuthContext)
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
      value: 14353,
      change: "-0.5%",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Order",
      value: 102412,
      change: "-0.5%",
      color: "bg-red-100 text-black-600",
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
    <div className="min-h-screen bg-gray-100">
      {/* Flex Layout */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Left Side - Stats */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-700">{item.title}</h2>
              <p className="text-3xl font-bold mt-2"><CountUp end={item.value} /></p>
              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${item.color}`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side - Chart */}
        <div className="flex-1 bg-white p-6 rounded-2xl  shadow hover:shadow-lg transition transform hover:scale-102">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            📊 Products by Category
          </h2>
          <div className="h-52">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>




      </div>
{user ? 
<NotificationsTable></NotificationsTable> : "Login first"}

    </div>
  );
};

export default Dashboard;
