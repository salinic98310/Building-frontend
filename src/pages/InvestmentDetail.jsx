import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sampleImg from "../assets/fundraising-example.jpg";

const InvestmentDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  if (!state?.campaign) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          No campaign data found
        </h1>
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition-all"
          onClick={() => navigate(-1)}
        >
          ⬅ Go Back
        </button>
      </div>
    );
  }

  const campaign = state.campaign;
  const progressPercent =
    (campaign.raisedAmount / campaign.moneyToRaise) * 100 || 0;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto relative">
        {/* Floating Company Overview Button */}
        <button
          onClick={() => setShowVideo(true)}
          className="fixed top-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 hover:from-blue-700 hover:to-indigo-600 transition-all z-20"
        >
          🎥 Company Overview
        </button>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
          {campaign.projectTitle}
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Image Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <img
              src={campaign.photo || sampleImg}
              alt={campaign.projectTitle}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Center Donation Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-200">
            <div>
              <p className="text-2xl font-bold text-green-600">
                ₹{campaign.raisedAmount?.toLocaleString() || 0} raised
              </p>
              <p className="text-gray-500 mb-6">
                of ₹{campaign.moneyToRaise?.toLocaleString()} goal
              </p>

              {/* Circular Progress */}
              <div className="flex justify-center mb-8">
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#grad)"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="282.743"
                      strokeDashoffset={`${
                        282.743 - (282.743 * progressPercent) / 100
                      }`}
                      className="transition-all duration-500 ease-in-out"
                    />
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-800">
                    {Math.round(progressPercent)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-lg flex items-center justify-center gap-2 shadow">
                🔗 Share
              </button>
              <button
                onClick={() => navigate("/payment", { state: { campaign } })}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 shadow"
              >
                ❤️ Donate Now
              </button>
            </div>

            {/* Recent Donations */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-purple-700 mb-2">
                Recent Donations
              </p>
              <div className="max-h-20 overflow-y-auto space-y-1">
                {(campaign.recentDonors || []).map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{c.author}</span>
                    <span>₹{c.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <h2 className="text-lg font-semibold mb-3 border-b pb-1">
                Documents
              </h2>
              {campaign.license ? (
                <img
                  src={campaign.license}
                  alt="License"
                  className="rounded-lg border shadow"
                />
              ) : (
                <p className="text-gray-500">No document uploaded</p>
              )}
            </div>

            {/* About Company */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <h2 className="text-lg font-semibold mb-3 border-b pb-1">
                About Company
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {campaign.fundingType === "Profit Return" && (
                  <>
                    <strong>Funding Type:</strong> {campaign.fundingType} <br />
                    <strong>Profit %:</strong> {campaign.profitPercentage || 0}%
                    <br />
                  </>
                )}
                <strong>Company Type:</strong>{" "}
                {campaign.projectCategory || "N/A"} <br />
                <strong>Location:</strong>{" "}
                {campaign.projectLocation?.city || "N/A"},{" "}
                {campaign.projectLocation?.state || "N/A"},{" "}
                {campaign.projectLocation?.country || "N/A"} <br />
                <strong>Created:</strong>{" "}
                {new Date(campaign.createdAt).toLocaleDateString()} <br />
                <strong>Days to Raise:</strong> {campaign.daysToRaise || 0} days{" "}
                <br />
                <strong>Licenses:</strong>{" "}
                {campaign.license_file_data_or_url || "KYC and Pan Approved"}
              </p>
            </div>
          </div>
        </div>

        {/* About Project */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-10 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            About the Project
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {campaign.projectOverview || campaign.introduction}
          </p>
        </div>

        {/* Gallery */}
        {campaign.gallery?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-10 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaign.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="rounded-lg shadow object-cover w-full h-48"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InvestmentDetail;
