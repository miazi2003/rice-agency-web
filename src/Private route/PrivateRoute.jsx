import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // ⏳ Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner text-purple-600 w-10 h-10"></span>
          <p className="text-gray-600 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // 🔒 Redirect unauthenticated users to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ⚙️ Role-based protection (if specified)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized access
  return children;
};

export default PrivateRoute;
