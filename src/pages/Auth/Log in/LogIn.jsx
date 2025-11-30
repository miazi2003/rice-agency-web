import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const LoginPage = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await signInUser(email, password);
      const user = res.user;

      alert(`Welcome back, ${user.displayName || user.email}!`);
      navigate(location.state?.pathname || "/", { replace: true });
    } catch (error) {
      console.error("❌ Login error:", error);
      // Use error message directly for more helpful feedback
      alert(error.message || "Failed to log in. Please check your credentials."); 
    } finally {
      setLoading(false);
    }
  };
  
  // Custom style object for the input focus ring
  const inputFocusStyle = {
    '--tw-ring-color': SECONDARY_COLOR,
    borderColor: '#ccc', // A neutral border
  };

  return (
    // Background gradient using secondary color hints
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4"> 
      <div 
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border-t-4 transition-transform duration-500 transform hover:scale-[1.01]"
        style={{ borderColor: PRIMARY_COLOR }} // Top border in Primary Color
      >
        {/* Title - Primary Color */}
        <h2 
          className="text-4xl font-extrabold text-center mb-8 tracking-tight"
          style={{ color: PRIMARY_COLOR }}
        >
          Access Dashboard 🔑
        </h2>

        <form onSubmit={handleLoginSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 outline-none transition"
              style={inputFocusStyle}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 outline-none transition"
              style={inputFocusStyle}
              required
            />
          </div>

          {/* Submit Button - Secondary Color */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-extrabold text-white rounded-xl text-lg transition shadow-lg mt-8 duration-300 hover:brightness-110 active:scale-[0.99] ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
            style={{ 
                backgroundColor: SECONDARY_COLOR, 
                // Using Primary Color for loading state for consistency
                opacity: loading ? 0.7 : 1, 
            }}
          >
            {loading ? "AUTHENTICATING..." : "Login"}
          </button>
        </form>
        
        {/* Optional: Placeholder for future "Forgot Password" link */}
        <p className="text-center text-sm mt-4 text-gray-500 hover:text-gray-700 cursor-pointer transition">
            Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default LoginPage;