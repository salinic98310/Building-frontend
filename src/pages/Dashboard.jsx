import React, { useState } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/property4.jpg"; // Sample profile image

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-700 text-white p-6 flex flex-col justify-between  shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center mb-6">CrowdFundX</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="#"
                className={`flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-[#343a40] hover:text-white transition-all duration-300 ${
                  activeTab === "dashboard" ? "bg-[#3c4b64] text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <span role="img" aria-label="dashboard">📊</span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-[#343a40] hover:text-white transition-all duration-300 ${
                  activeTab === "profile" ? "bg-[#3c4b64] text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <span role="img" aria-label="profile">👤</span>
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-[#343a40] hover:text-white transition-all duration-300 ${
                  activeTab === "projects" ? "bg-[#3c4b64] text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("projects")}
              >
                <span role="img" aria-label="projects">🚀</span>
                My Campaigns
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-[#343a40] hover:text-white transition-all duration-300 ${
                  activeTab === "investments" ? "bg-[#3c4b64] text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("investments")}
              >
                <span role="img" aria-label="investments">💸</span>
                My Investments
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-[#343a40] hover:text-white transition-all duration-300 ${
                  activeTab === "analytics" ? "bg-[#3c4b64] text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("analytics")}
              >
                <span role="img" aria-label="analytics">📈</span>
                Campaign Analytics
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center mt-6">
          <button className="bg-[#F8D388] py-2 px-4 rounded-lg w-full text-gray-700 hover:bg-[#F8E1A1] transition-all duration-300">
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Content based on activeTab */}
        {activeTab === "dashboard" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h2>
            {/* Uppermost Section: Four Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {/* Box 1: Fundraising Goal */}
              <div className="p-6 bg-[#6f42c1] text-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Total Funds Raised</h3>
                <p className="text-2xl">$10,500</p>
              </div>
              {/* Box 2: Investments */}
              <div className="p-6 bg-[#28a745] text-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Investments Made</h3>
                <p className="text-2xl">25</p>
              </div>
              {/* Box 3: Campaign Status */}
              <div className="p-6 bg-[#ffc107] text-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Active Campaigns</h3>
                <p className="text-xl">5 Campaigns</p>
              </div>
              {/* Box 4: Returns */}
              <div className="p-6 bg-[#17a2b8] text-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Total Returns</h3>
                <p className="text-xl">$2,500</p>
              </div>
            </div>

            {/* My Projects Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">My Fundraising Projects</h3>
              <div className="flex gap-4">
                <div className="bg-[#F8E1A1] p-4 rounded-lg shadow-md flex-1">
                  <h4 className="font-semibold text-lg">Project 1</h4>
                  <p>Goal: $15,000</p>
                  <p>Raised: $5,500</p>
                  <button className="bg-[#F8D388] py-2 px-4 rounded-lg w-full">View Details</button>
                </div>
                <div className="bg-[#F8E1A1] p-4 rounded-lg shadow-md flex-1">
                  <h4 className="font-semibold text-lg">Project 2</h4>
                  <p>Goal: $20,000</p>
                  <p>Raised: $12,000</p>
                  <button className="bg-[#F8D388] py-2 px-4 rounded-lg w-full">View Details</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[#F8E1A1]"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-600">Email: johndoe@example.com</p>
              <p className="text-gray-600">Member since: January 2021</p>
              <p className="text-gray-600">Bio: Enthusiastic investor with a passion for tech startups.</p>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">My Campaigns</h2>
            <p>Here you can view and manage your fundraising projects.</p>
            {/* Add project management section here */}
          </div>
        )}

        {activeTab === "investments" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">My Investments</h2>
            {/* Investor's Investment Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Ongoing Investments</h3>
              <div className="flex gap-4">
                <div className="bg-[#F8E1A1] p-4 rounded-lg shadow-md flex-1">
                  <h4 className="font-semibold text-lg">Project 1</h4>
                  <p>Invested: $2,000</p>
                  <p>Expected Return: 15%</p>
                  <button className="bg-[#F8D388] py-2 px-4 rounded-lg w-full">View Details</button>
                </div>
                <div className="bg-[#F8E1A1] p-4 rounded-lg shadow-md flex-1">
                  <h4 className="font-semibold text-lg">Project 2</h4>
                  <p>Invested: $5,000</p>
                  <p>Expected Return: 10%</p>
                  <button className="bg-[#F8D388] py-2 px-4 rounded-lg w-full">View Details</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Campaign Analytics</h2>
            <p>Here you can view performance statistics for your projects.</p>
            {/* Add project analytics charts or tables here */}
          </div>
        )}
      </div>
    </section>
  );
}
