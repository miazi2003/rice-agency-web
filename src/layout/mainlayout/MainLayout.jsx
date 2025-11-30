import React, { useContext } from "react";
import Navbar from "../../component/navbar/Navbar";
import { Outlet, NavLink } from "react-router";
import Footer from "../../component/footer/Footer";
import { AuthContext } from "../../context/AuthContext";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;
  console.log(role);

  // Active background is a defined light gray
  const ACTIVE_BG_COLOR = "#e6e6e6"; 
  // Active text color is explicitly BLACK
  const ACTIVE_TEXT_COLOR = '#000000'; 

  const getNavLinkClass = (isActive) =>
    `px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 text-black ${ 
      isActive
        ? `shadow-sm` // Active links have a subtle shadow
        : "hover:bg-gray-100" // Inactive links get a hover effect
    }`;
    
  // Override the isActive style to use brand colors
  const getActiveStyle = (isActive) => ({
      // Use light gray background and black text
      backgroundColor: isActive ? ACTIVE_BG_COLOR : 'transparent',
      color: '#000000', // Always black text
      
      // Secondary color remains the bright accent border
      borderRight: isActive ? `4px solid ${SECONDARY_COLOR}` : 'none',
      paddingRight: isActive ? '20px' : '24px', // Adjust padding for border
  });

  return (
    <div className="flex flex-col min-h-screen text-black">
      {/* Navbar */}
      <Navbar />

      {/* Content area with sidebar + outlet */}
      <div className="flex flex-1 bg-gray-50 text-black">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-2xl p-6 hidden md:block text-black">
          <h2 className="text-2xl font-extrabold mb-8 uppercase tracking-wider text-black">
            Dashboard
          </h2>
          <nav className="flex flex-col gap-2 text-black">

            {/* General Links */}
            <NavLink
              to="/"
              end
              className={({ isActive }) => getNavLinkClass(isActive)}
              style={({ isActive }) => getActiveStyle(isActive)}
            >
              📊 Overview
            </NavLink>
            <NavLink
              to="/allProducts"
              className={({ isActive }) => getNavLinkClass(isActive)}
              style={({ isActive }) => getActiveStyle(isActive)}
            >
              📦 Products
            </NavLink>

            {/* Admin Links (Conditionally Rendered) */}
            {role === "admin" && (
              <>
                <NavLink
                  to="/allClient"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  style={({ isActive }) => getActiveStyle(isActive)}
                >
                  👥 Customers
                </NavLink>
                {/* <NavLink
                  to="/addProduct"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  style={({ isActive }) => getActiveStyle(isActive)}
                >
                  ➕ Add Product
                </NavLink> */}
                {/* <NavLink
                  to="/addCustomer"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  style={({ isActive }) => getActiveStyle(isActive)}
                >
                  ➕ Add Customer
                </NavLink> */}
                <NavLink
                  to="/dataGrid"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  style={({ isActive }) => getActiveStyle(isActive)}
                >
                  📋 Upcoming Orders
                </NavLink>
                <NavLink
                  to="/addOrder"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  style={({ isActive }) => getActiveStyle(isActive)}
                >
                  ✍️ Add Order
                </NavLink>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 text-black">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;