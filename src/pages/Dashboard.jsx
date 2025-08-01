import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [fundraisers, setFundraisers] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch the user data and their fundraisers
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in local storage.");
        return;
      }

      // Fetch fundraisers related to the logged-in user
      axios
        .get(`http://localhost:5000/api/fundraiser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFundraisers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching fundraisers", error);
        });
    }
  }, [navigate , userId]);

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCampaign(null);
  };

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-700 text-white p-6 flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center mb-6">CrowdFundX</h2>
          <ul className="space-y-4">
            {[
              ["dashboard", "📊", "Dashboard"],
              ["profile", "👤", "My Profile"],
              ["projects", "🚀", "My Campaigns"],
              ["investments", "💸", "My Investments"],
              ["analytics", "📈", "Campaign Analytics"],
            ].map(([key, emoji, label]) => (
              <li key={key}>
                <a
                  href="#"
                  className={`flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-[#343a40] hover:text-white transition-all duration-300 ${
                    activeTab === key ? "bg-[#3c4b64] text-white" : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  <span role="img" aria-label={label}>
                    {emoji}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center mt-6">
          <button
            className="bg-[#F8D388] py-2 px-4 rounded-lg w-full text-gray-700 hover:bg-[#F8E1A1] transition-all duration-300"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h2>

            {/* Dashboard Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-6 bg-[#6f42c1] text-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Total Funds Raised</h3>
                <p className="text-2xl">$10,500</p>
              </div>
              <div className="p-6 bg-[#28a745] text-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Investments Made</h3>
                <p className="text-2xl">25</p>
              </div>
              <div className="p-6 bg-[#ffc107] text-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Active Campaigns</h3>
                <p className="text-xl">{fundraisers.length} Campaigns</p>
              </div>
              <div className="p-6 bg-[#17a2b8] text-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">Total Returns</h3>
                <p className="text-xl">$2,500</p>
              </div>
            </div>

            {/* Campaigns Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-4">My Fundraising Projects</h3>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {Array.isArray(fundraisers) && fundraisers.length > 0 ? (
                  fundraisers.map((fundraiser) => (
                    <div
                      key={fundraiser._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden w-full"
                    >
                      <div className="relative">
                        <img
                          src={fundraiser.image}
                          alt={fundraiser.companyName}
                          className="w-full h-52 object-cover"
                        />
                        <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">
                          {fundraiser.location || "Unknown"}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg leading-snug">
                          {fundraiser.companyName}
                        </h4>
                        <p className="text-sm text-gray-700 mt-1">
                          {fundraiser.shortDescription || "Help us reach our goal!"}
                        </p>
                        <div className="mt-4 mb-2">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (fundraiser.raisedAmount / fundraiser.moneyToRaise) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          ${fundraiser.raisedAmount.toLocaleString()} raised
                        </p>
                        <button
                          onClick={() => handleViewDetails(fundraiser)}
                          className="mt-4 w-full bg-[#F8D388] text-gray-800 font-medium py-2 rounded-lg transition hover:bg-[#f4c66d]"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No fundraisers created yet. Start a fundraiser!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Campaign Details Modal */}
        {modalVisible && selectedCampaign && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-4xl">
              <h3 className="text-2xl font-bold mb-4">Campaign Details</h3>
              <h4 className="text-xl font-semibold mb-2">{selectedCampaign.companyName}</h4>
              <p><strong>Goal:</strong> ${selectedCampaign.moneyToRaise}</p>
              <p><strong>Raised Amount:</strong> ${selectedCampaign.raisedAmount}</p>
              <p><strong>Overview:</strong> {selectedCampaign.overview}</p>
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white py-2 px-4 rounded-lg mt-4 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
