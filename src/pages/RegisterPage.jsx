import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Field validation
    if (!username || !name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser(username, email, password);
      console.log("Registration response:", response);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setUsername("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login after short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#A7C7E7] via-[#E3F1FF] to-[#F0F8FF]">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-3xl p-6 w-[500px] max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#333]">Create Your Account</h2>

        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <InputField
          id="username"
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
        />

        <InputField
          id="name"
          label="Full Name"
          value={name}
          onChange={setName}
          placeholder="Enter your full name"
        />

        <InputField
          id="email"
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="Enter your email"
        />

        <InputField
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          placeholder="Enter your password"
        />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          type="password"
          placeholder="Confirm your password"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300"
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

// ✅ Reusable input component
function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-[#D1D5DB] placeholder-[#9CA3AF]"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
