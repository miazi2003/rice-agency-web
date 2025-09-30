import React from "react";
import Navbar from "../../component/navbar/Navbar";
import { Outlet, NavLink } from "react-router";
import Footer from "../../component/footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content area with sidebar + outlet */}
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
          <h2 className="text-2xl font-bold text-violet-700 mb-6">Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/allClient"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              Customers
            </NavLink>
            <NavLink
              to="/allProducts"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/addProduct"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              Add Product
            </NavLink>
            <NavLink
              to="/addCustomer"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              Add Customer
            </NavLink>
            <NavLink
              to="/dataGrid"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
             Upcoming Orders
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
