import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const [investOpen, setInvestOpen] = useState(false);
  const [fundraiseOpen, setFundraiseOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [user, setUser] = useState(null); // Store user data
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if user is logged in by looking for the JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
      setIsLoggedIn(true);
      setUser(decoded); // Set user details from decoded token
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    navigate("/login"); // Redirect to login page after logout
  };

  // Helper function to generate a background color based on the user's name
  const generateBackgroundColor = (name) => {
    if (!name) return "#ccc"; // Default color if name is undefined or empty
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = `hsl(${hash % 360}, 70%, 50%)`; // Generate a color based on the user's name
    return color;
  };

  // Get the first letter of the user's name
  const getFirstLetter = (name) => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase();
    }
    return "?"; // Return '?' if the name is empty or undefined
  };

  console.log(user); // Debugging line to check user object

  return (
    <header className="relative z-20 bg-gray-700 shadow-xl py-5 px-8 flex items-center text-base text-white backdrop-blur-lg transition-all duration-300 ease-in-out">
      {/* Left-aligned Logo */}
      <div
        className="text-3xl font-bold cursor-pointer hover:text-blue-500 flex-shrink-0"
        onClick={() => navigate("/")}
      >
        Logo
      </div>

      {/* Center Navigation with Gradient Effect */}
      <nav className="flex gap-10 items-center justify-center flex-grow">
        <a href="#" className="flex items-center gap-1 px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-white hover:bg-opacity-20 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z" />
          </svg>
          Search
        </a>

        <a href="#" className="px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-white hover:bg-opacity-20 hover:text-black">How it Works</a>

        {/* Invest Dropdown */}
        <div className="relative" onMouseEnter={() => setInvestOpen(true)} onMouseLeave={() => setInvestOpen(false)}>
          <button onClick={() => setInvestOpen((prev) => !prev)} className="px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-white hover:bg-opacity-20 hover:text-black">
            Invest ▾
          </button>

          {investOpen && (
            <div className="absolute flex flex-col bg-white shadow-xl rounded-lg mt-2 w-[500px] p-6 z-30 text-black">
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-gray-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800 text-base">Discover fundraisers and nonprofits to invest in</h4>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <Link to="/browse-investors" className="block hover:bg-gray-50 rounded p-2">
                  <p className="font-medium text-gray-800">Browse Investors</p>
                  <p className="text-sm text-gray-500">Start investing by browsing investors</p>
                </Link>
                <a href="#" className="block hover:bg-gray-50 rounded p-2">
                  <p className="font-medium text-gray-800">Supporter Space</p>
                  <p className="text-sm text-gray-500">Inspiration, FAQs, and where to give</p>
                </a>
                <a href="#" className="block hover:bg-gray-50 rounded p-2">
                  <p className="font-medium text-gray-800">Profit Investment</p>
                  <p className="text-sm text-gray-500">Get profit from your investments</p>
                </a>
                <a href="#" className="block hover:bg-gray-50 rounded p-2">
                  <p className="font-medium text-gray-800">Nonprofits</p>
                  <p className="text-sm text-gray-500">Invest in businesses</p>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Fundraise Dropdown */}
        <div className="relative" onMouseEnter={() => setFundraiseOpen(true)} onMouseLeave={() => setFundraiseOpen(false)}>
          <button onClick={() => setFundraiseOpen((prev) => !prev)} className="px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-white hover:bg-opacity-20 hover:text-black">
            Fundraise ▾
          </button>

          {fundraiseOpen && (
            <div className="absolute flex flex-col bg-white shadow-xl rounded-lg mt-2 w-[500px] p-6 z-30 text-black">
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-gray-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800 text-base">Start a fundraiser campaign</h4>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <Link to="/fundraising" className="block hover:bg-gray-50 rounded p-2">
                  <p className="font-medium text-gray-800">Start A Fundraiser</p>
                  <p className="text-sm text-gray-500">Launch your fundraiser</p>
                </Link>
                <a href="#" className="block hover:bg-gray-50 rounded p-2">
                  <p className="font-medium text-gray-800">Profit Fundraising</p>
                  <p className="text-sm text-gray-500">Gain Profit from your fundraising</p>
                </a>
                <a href="#" className="block hover:bg-gray-50 rounded p-2">
                  <p className="font-medium text-gray-800">Nonprofits Fundraising</p>
                  <p className="text-sm text-gray-500">Fundraise for your business with no return policy</p>
                </a>
                <a href="#" className="block hover:bg-gray-50 rounded p-2">
                  <p className="font-medium text-gray-800">Fundraising Ideas</p>
                  <p className="text-sm text-gray-500">Ideas to spark your creativity</p>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Right-aligned Buttons for Login/Profile */}
      <div className="flex gap-6 items-center ml-auto">
        {isLoggedIn ? (
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative cursor-pointer flex items-center justify-center w-12 h-12 rounded-full"
            style={{
              backgroundColor: generateBackgroundColor(user?.name), // Color based on name
              color: "#fff",
              fontSize: "1.25rem", // Increase font size for better visibility
              fontWeight: "bold", // Bold for better clarity
            }}
          >
            {getFirstLetter(user?.name)} {/* Display first letter inside circle */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <div className="px-4 py-2 text-gray-800 cursor-pointer" onClick={() => navigate("/profile")}>
                  My Profile
                </div>
                <div className="px-4 py-2 text-gray-800 cursor-pointer" onClick={() => navigate("/settings")}>
                  Profile Settings
                </div>
                <div className="px-4 py-2 text-gray-800 cursor-pointer" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded transition-all duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
