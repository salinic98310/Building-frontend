import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFundraisers } from "../context/FundraiserContext";

export default function StartFundraiser() {
  const navigate = useNavigate();
  const { addFundraiser } = useFundraisers();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    pincode: "",
    purpose: "",
    photo: null,
    overview: "",
    video: null,
    companyName: "",
  });

  const handleNext = () => {
    if (step < 7) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    addFundraiser(formData);
    alert("Fundraiser submitted successfully!");
    navigate("/dashboard"); // redirect to dashboard
  };

  return (
    <main className="flex min-h-screen bg-white">
      {/* Sidebar with Clickable Steps */}
      <div className="w-1/4 bg-gray-50 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Steps</h2>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <div
            key={n}
            className={`p-4 cursor-pointer rounded-lg text-center transition-all duration-300 
            ${n === step ? "bg-yellow-200 text-gray-800" : "bg-gray-200 text-gray-500"}`}
            onClick={() => setStep(n)}
          >
            {n === 1 && "Location Details"}
            {n === 2 && "Purpose"}
            {n === 3 && "Company Photo"}
            {n === 4 && "Company Overview"}
            {n === 5 && "Company Structural Video"}
            {n === 6 && "Company Name"}
            {n === 7 && "Review & Submit"}
          </div>
        ))}
      </div>

      {/* Main Content for Each Step */}
      <div className="w-3/4 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Start Your Fundraiser</h1>

        {/* Step Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Step 1: Location Details */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-600 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Pin Code</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Purpose */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Purpose</h2>
              <div className="space-y-2">
                {["Business", "Startup", "Company Growth"].map((purpose) => (
                  <label key={purpose} className="block">
                    <input
                      type="radio"
                      name="purpose"
                      value={purpose}
                      checked={formData.purpose === purpose}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {purpose}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Company Photo */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Photo</h2>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
              />
              {formData.photo && (
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  className="mt-4 rounded-lg shadow-lg w-48"
                />
              )}
            </div>
          )}

          {/* Step 4: Overview Description */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Overview</h2>
              <textarea
                name="overview"
                rows={5}
                value={formData.overview}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                placeholder="Describe your company..."
              />
            </div>
          )}

          {/* Step 5: Company Structural Video */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Structural Video</h2>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
              />
              {formData.video && (
                <video
                  src={URL.createObjectURL(formData.video)}
                  controls
                  className="mt-4 rounded-lg shadow-lg w-full"
                />
              )}
            </div>
          )}

          {/* Step 6: Company Name */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Name</h2>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                placeholder="Enter Company Name"
              />
            </div>
          )}

          {/* Step 7: Review & Submit */}
          {step === 7 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Review & Submit</h2>
              <ul className="text-gray-700 space-y-2">
                <li><strong>State:</strong> {formData.state}</li>
                <li><strong>City:</strong> {formData.city}</li>
                <li><strong>Pin Code:</strong> {formData.pincode}</li>
                <li><strong>Purpose:</strong> {formData.purpose}</li>
                <li><strong>Company Name:</strong> {formData.companyName}</li>
                <li><strong>Overview:</strong> {formData.overview}</li>
              </ul>
              {formData.photo && (
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Company"
                  className="mt-4 w-48 rounded shadow-lg"
                />
              )}
              {formData.video && (
                <video
                  src={URL.createObjectURL(formData.video)}
                  controls
                  className="mt-4 w-full rounded shadow-lg"
                />
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-all duration-300"
            >
              Back
            </button>
          )}

          {step < 7 ? (
            <button
              onClick={handleNext}
              className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 py-2 px-6 rounded-lg transition-all duration-300"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
            >
              Submit Fundraiser
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
