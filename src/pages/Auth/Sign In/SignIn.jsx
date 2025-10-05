import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hook/UseAxiosSecure";

const SignupPage = () => {
  const { signUpUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure()
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const signupData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    // Password match validation
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Firebase Signup
      const res = await signUpUser(signupData.email, signupData.password);
      console.log("Firebase signup successful:", res.user);

      // 2️⃣ Update Firebase displayName
      await updateUser(signupData.name);

      // 3️⃣ Call backend API to save user in DB
      const userForDB = {
        name: signupData.name,
        email: signupData.email,
        role: "user",
      };

      const apiRes = await axiosSecure.post("http://localhost:5000/users", userForDB);
      console.log("User saved in DB:", apiRes.data);

      form.reset();
      alert("Signup successful!");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700">Sign Up</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white rounded-lg ${
              loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
