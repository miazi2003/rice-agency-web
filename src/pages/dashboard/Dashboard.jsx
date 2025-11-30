import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CountUp from "react-countup";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import NotificationsTable from "../../component/data grid/DataGrid";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalProductPrice: 0,
    totalOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [customersRes, productsRes, ordersRes] = await Promise.all([
          axiosSecure.get("/customers"),
          axiosSecure.get("/products"),
          axiosSecure.get("/orders"),
       ]);

        const customers = customersRes.data || [];
        const products = productsRes.data || [];
        const orders = ordersRes.data || [];

        const totalCustomers = customers.length;
        const totalProducts = products.length;
        const totalProductPrice = products.reduce(
          (acc, p) => acc + (p.price || 0),
          0
        );
        const totalOrders = orders.length;

        setStats({ totalCustomers, totalProducts, totalProductPrice, totalOrders });
      } catch (err) {
        console.error("❌ Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchStats();
  }, [user, axiosSecure]); // Added axiosSecure dependency

  // Chart data uses branded colors
  const chartData = {
    labels: ["Customers", "Products", "Orders"],
    datasets: [
      {
        data: [
          stats.totalCustomers,
          stats.totalProducts,
          stats.totalOrders,
        ],
        backgroundColor: [
          PRIMARY_COLOR, // Primary Color
          SECONDARY_COLOR, // Secondary Color
          "#38B2AC", // Teal for third stat (A good contrast color)
        ],
        borderColor: '#ffffff', // White border for separation
        borderWidth: 2,
      },
    ],
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 text-lg">
        Please log in to view your dashboard.
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold animate-pulse" style={{ color: PRIMARY_COLOR }}>
          Loading dashboard data...
        </p>
      </div>
    );

  return (
    <div className="p-6 md:p-8">
      {/* Title - Primary Color */}
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-wide" style={{ color: PRIMARY_COLOR }}>
        Welcome, {user.displayName || user.email}!
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<Users size={32} />}
          // Primary Color Accent
          bgColor={PRIMARY_COLOR} 
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package size={32} />}
          // Secondary Color Accent
          bgColor={SECONDARY_COLOR} 
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart size={32} />}
          // Tertiary color for balance
          bgColor="#38B2AC" 
        />
        <StatCard
          title="Total Inventory Value"
          value={stats.totalProductPrice}
          prefix="৳"
          icon={<DollarSign size={32} />}
          // Another tertiary color
          bgColor="#F59E0B" 
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto border-t-4" style={{ borderColor: PRIMARY_COLOR }}>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          System Summary
        </h2>
        <div className="h-72 w-72 mx-auto">
          <Doughnut
            data={chartData}
            options={{
              plugins: { 
                legend: { 
                    position: "bottom",
                    labels: {
                        font: {
                            family: 'sans-serif',
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += new Intl.NumberFormat('en-US').format(context.parsed);
                            }
                            return label;
                        }
                    }
                }
              },
              cutout: "70%",
            }}
          />
        </div>
      </div>

      {/* Notifications Table */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Upcoming Notifications
        </h2>
        <NotificationsTable />
      </div>
    </div>
  );
};

// Revamped StatCard component
const StatCard = ({ title, value, icon, prefix = "", bgColor }) => (
  <div
    className={`p-6 rounded-2xl shadow-xl text-white flex items-center justify-between transform transition duration-300 hover:scale-[1.05]`}
    style={{ backgroundColor: bgColor }}
  >
    <div>
      <p className="text-sm uppercase tracking-wider font-semibold opacity-90">
        {title}
      </p>
      <h3 className="text-4xl font-extrabold mt-1">
        <CountUp 
          end={value} 
          prefix={prefix} 
          duration={1.6} 
          separator="," 
        />
      </h3>
    </div>
    <div className="opacity-80 p-2 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
        {icon}
    </div>
  </div>
);

export default Dashboard;