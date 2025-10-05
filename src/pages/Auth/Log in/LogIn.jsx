import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

const LoginPage = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const loginData = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const res = await signInUser(loginData.email, loginData.password);
      console.log("User logged in:", res.user); // <-- this is correct

      alert(`Welcome, ${res.user.displayName || res.user.email}`);

      navigate(location.state?.pathname || "/");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Failed to login");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
