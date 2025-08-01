import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isNewUser, setIsNewUser] = useState(false); // State to toggle between login and registration

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Handle successful login
      const { token, user } = response.data;

      // Store user data and token in localStorage
      Cookies.set("token", token, { expires: 7 }); // Expires in 7 days (optional)

      // Update global state with the logged-in user

      // Redirect user to their dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#A7C7E7] via-[#E3F1FF] to-[#F0F8FF]">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-96 max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#333]">Login</h2>

        {/* Error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-gray-300"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700 border-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-yellow-300 text-black py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>

          {/* New User? Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isNewUser ? (
                <>
                  New to the platform?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => setIsNewUser(false)}
                  >
                    Register here
                  </Link>
                </>
              ) : (
                <>
                  Not a user yet?{" "}
                  <button
                    onClick={() => setIsNewUser(true)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Register here
                  </button>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
