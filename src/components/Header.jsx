import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [investOpen, setInvestOpen] = useState(false);
  const [fundraiseOpen, setFundraiseOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // State to store logged-in user data

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  // Render the first letter of the user's name or email as the avatar
  const getAvatarLetter = () => {
    if (loggedInUser && loggedInUser.name) {
      return loggedInUser.name.charAt(0).toUpperCase();
    }
    if (loggedInUser && loggedInUser.email) {
      return loggedInUser.email.charAt(0).toUpperCase();
    }
    return "U"; // Default to "U" if no user data is available
  };

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

      {/* User icon or logged-in avatar */}
      {loggedInUser ? (
        <div className="relative">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-600 text-white font-bold cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {getAvatarLetter()}
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              <div className="flex justify-end p-2">
                <button
                  className="text-gray-500 hover:text-gray-700 text-lg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="flex flex-col items-center p-4 pt-0">
                <div className="w-20 h-20 rounded-full bg-pink-600 text-white text-3xl font-bold flex items-center justify-center">
                  {getAvatarLetter()}
                </div>
                <div className="mt-2 text-gray-800 font-semibold text-center text-lg">
                  Hi, {loggedInUser.name.toUpperCase()}!
                </div>
                <div className="text-sm text-gray-500 text-center">
                  {loggedInUser.email}
                </div>
                
              </div>
              <div className="flex border-t border-gray-200">
                <button
                  className="flex-1 text-sm text-gray-700 p-3 hover:bg-gray-100"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className="flex-1 text-sm text-gray-700 p-3 hover:bg-gray-100"
                  onClick={() => navigate("/dashboard")}
                >
                  My Profile
                </button>
                <button
                  className="flex-1 text-sm text-gray-700 p-3 hover:bg-gray-100"
                  onClick={() => navigate("/dashboard")}
                >
                  Profile settings
                </button>
                <button
                  className="flex-1 text-sm text-gray-700 p-3 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded transition-all duration-300"
        >
          Login
        </button>
      )}
    </header>
  );
}
