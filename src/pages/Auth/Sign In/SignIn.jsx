import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hook/UseAxiosSecure";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const SignupPage = () => {
  const { signUpUser, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Common styles for inputs and labels
  const inputClass = "w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 outline-none transition";
  const labelClass = "block text-sm font-bold text-gray-700 mb-1";
  
  // Custom style object for the input focus ring (Secondary Color)
  const inputFocusStyle = {
    '--tw-ring-color': SECONDARY_COLOR,
    borderColor: '#ccc', // A neutral border
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Create user with Firebase
      const res = await signUpUser(email, password);
      console.log("✅ Firebase signup successful:", res.user);

      // 2️⃣ Update Firebase displayName
      await updateUser(name);

      // 3️⃣ Save user in backend database
      const userForDB = { name, email, role: "user" };
      const apiRes = await axiosSecure.post("/users", userForDB);
      console.log("✅ User saved in DB:", apiRes.data);

      form.reset();
      setSuccess("Account created successfully! You can now log in.");
    } catch (err) {
      console.error("❌ Signup error:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background gradient for a soft look
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div 
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border-t-4 transition-transform duration-500 transform hover:scale-[1.01]"
        style={{ borderColor: PRIMARY_COLOR }} // Top border in Primary Color
      >
        {/* Title - Primary Color */}
        <h2 
          className="text-4xl font-extrabold text-center mb-6 tracking-tight"
          style={{ color: PRIMARY_COLOR }}
        >
          Create Account 📝
        </h2>

        {/* Error & Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-xl text-center mb-4">
            <p className="font-semibold text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-300 text-green-700 p-3 rounded-xl text-center mb-4">
            <p className="font-semibold text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSignupSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className={inputClass}
              style={inputFocusStyle}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className={inputClass}
              style={inputFocusStyle}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className={inputClass}
              style={inputFocusStyle}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className={labelClass}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              className={inputClass}
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
                opacity: loading ? 0.7 : 1, 
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;