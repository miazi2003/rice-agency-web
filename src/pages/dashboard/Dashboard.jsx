import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import CountUp from "react-countup";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import NotificationsTable from "../../component/data grid/DataGrid";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalProductPrice: 0,
    totalOrders: 0,
  });


  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Customers
        const customersRes = await axiosSecure.get("/customers");
        const totalCustomers = customersRes.data.length;

        // Products
        const productsRes = await axiosSecure.get("/products");
        const products = productsRes.data;
        const totalProducts = products.length;
        const totalProductPrice = products.reduce(
          (acc, product) => acc + (product.price || 0),
          0
        );

        // Orders
        const ordersRes = await axiosSecure.get("/orders"); // you may adjust this API if needed
        const totalOrders = ordersRes.data.length;

        
        setStats({ totalCustomers, totalProducts, totalProductPrice, totalOrders });

      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    if (user) fetchStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Stats */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Total Customers</h2>
            <p className="text-3xl font-bold mt-2">
              <CountUp end={stats.totalCustomers} />
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
            <p className="text-3xl font-bold mt-2">
              <CountUp end={stats.totalProducts} />
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Total Product Price</h2>
            <p className="text-3xl font-bold mt-2">
              <CountUp end={stats.totalProductPrice} prefix="$" />
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
            <p className="text-3xl font-bold mt-2">
              <CountUp end={stats.totalOrders} />
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />
{user ? <NotificationsTable></NotificationsTable> : "login first"}
    </div>
  );
};

export default Dashboard;
