import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for navigation in React Router v6
import axios from "axios"; // For making API requests

export default function RegisterPage() {
  const navigate = useNavigate(); // useNavigate hook to navigate after registration
  const [username, setUsername] = useState(""); // State for username
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Error state for validation
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation check for empty fields
    if (username === "" || name === "" || email === "" || password === "" || confirmPassword === "") {
      setError("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send registration data to backend
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,  // Added username to the request
        name,
        email,
        password,
        confirmPassword,
      });

      // Handle successful registration response
      setSuccessMessage(response.data.message); // Display the success message
      setError(""); // Clear any previous errors

      // Clear form fields after successful registration
      setUsername("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login page after success
      navigate("/login");

    } catch (err) {
      // Handle errors from the backend
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setSuccessMessage(""); // Clear success message in case of error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#A7C7E7] via-[#E3F1FF] to-[#F0F8FF]">
      <div className="bg-white shadow-xl rounded-3xl p-6 w-[500px] max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#333]">Create Your Account</h2>

        {/* Show Success Message */}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        {/* Show Error Message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Registration Form */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-[#D1D5DB] placeholder-[#9CA3AF]"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-[#D1D5DB] placeholder-[#9CA3AF]"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-[#D1D5DB] placeholder-[#9CA3AF]"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-[#D1D5DB] placeholder-[#9CA3AF]"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-[#D1D5DB] placeholder-[#9CA3AF]"
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300"
        >
          Register
        </button>

        {/* Already have an account? Section */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
