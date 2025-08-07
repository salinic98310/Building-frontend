import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sampleImg from "../assets/fundraising-example.jpg"; 
const InvestmentDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  if (!state?.campaign) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600">No campaign data found.</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const campaign = state.campaign;
  const progressPercent = (campaign.raisedAmount / campaign.moneyToRaise) * 100 || 0;

  return (
    <section className="bg-white px-4 py-10 relative overflow-hidden">
      {/* Video Button */}
      <button
        onClick={() => setShowVideo(true)}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 z-10"
      >
        Company Overview
      </button>

      {/* Modal Video */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 shadow-xl max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Company Overview</h2>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-600 hover:text-black text-lg"
              >
                ✕
              </button>
            </div>
            <video
              src={campaign.video}
              controls
              className="w-full rounded-lg max-h-[80vh]"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          {campaign.projectTitle}
        </h1>

        {/* Main Row */}
        <div className="flex flex-col md:flex-row gap-1 mb-12 items-center justify-between">
          {/* Image */}
          <div className="w-full md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
            <img
              src={campaign.photo || sampleImg} // Fallback to sample image if no photo is available
              alt={campaign.projectTitle}
              className="w-full h-100 object-cover rounded-lg"
            />
          </div>

          {/* Donation Info */}
          <div className="w-full md:w-1/4 bg-white border border-gray-200 rounded-xl shadow p-6 mb-6 md:mb-0">
            <p className="text-xl font-semibold mb-1">
              ₹{campaign.raisedAmount?.toLocaleString() || 0} raised
            </p>
            <p className="text-gray-600 mb-4">
              of ₹{campaign.moneyToRaise?.toLocaleString()} goal
            </p>

            {/* Circular Progress */}
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
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
                    stroke="#22c55e"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray="282.743"
                    strokeDashoffset={`${
                      282.743 - (282.743 * progressPercent) / 100
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                  {Math.round(progressPercent)}%
                </div>
              </div>
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded mb-2">
              Share
            </button>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded mb-4">
              Donate Now
            </button>

            <div>
              <p className="text-sm font-medium mb-2 text-purple-700">
                Recent Donations
              </p>
              {(campaign.recentDonors || []).map((c, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm mb-1 text-gray-800"
                >
                  <span>{c.author}</span>
                  <span>₹{c.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* type + Documents */}
          <div className="w-full md:w-1/3">
            

            <h2 className="text-2xl font-semibold mb-4">Documents</h2>
            <ul className="text-blue-600">
              {(campaign.Licences || []).map((license_file_data_or_url, i) => (
                <li key={i}>
                  <a href={license_file_data_or_url.url || "#"} target="_blank" rel="noreferrer">
                    {license_file_data_or_url.name || license_file_data_or_url}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-4">About Company</h2>
            <p className="text-gray-700 whitespace-pre-line mb-8 ">
              {campaign.fundingType === "Profit Return" && (
                <>
                  <span className="font-semibold ">Funding Type:</span> {campaign.fundingType} <br />
                  <span className="font-semibold">Profit Percentage:</span> {campaign.profitPercentage || 0}% <br />
                </>
              )}
              <span className="font-semibold"> Company Type:</span> {campaign.projectCategory || "N/A"} <br />
             <span className="font-semibold">Location:</span> {campaign.projectLocation?.city || "N/A"}, {campaign.projectLocation?.InvestmentDetail.state || "N/A"}, {campaign.projectLocation?.country || "N/A"} <br />
              <span className="font-semibold">Created At:</span> {new Date(campaign.createdAt).toLocaleDateString()} <br />
              <span className="font-semibold">Days to Raise:</span> {campaign.daysToRaise || 0} days <br />
              <span className="font-semibold">Licenses:</span> {campaign.license_file_data_or_url|| "KYC and Pan Approved "} <br />
            </p>
          </div>
        </div>
              {/* About + Documents */}
          <div className="w-full ">
            <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
            <p className="text-gray-700 whitespace-pre-line mb-4">
              {campaign.projectOverview || campaign.introduction}
            </p>

          </div>
        {/* Gallery */}
        {campaign.gallery?.length > 0 && (
          <div className="w-full mb-10">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaign.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="rounded w-full h-48 object-cover"
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
