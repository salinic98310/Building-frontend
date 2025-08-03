import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests
import { createFundraiser } from "../api/user";
 // Import multer for file handling

export default function StartFundraiser({ LoggedInUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
   companyName: "",
  overview: "",
  purpose: "", // "Business", "Startup", "Growth"
  projectTitle: "",
  projectCategory: "", // "Business", "Startup", "Company Growth"
  projectOverview: "",

  // Step 2: Location
  state: "",
  city: "",
  pincode: "",

  // Step 3: Media Uploads
  photo: null,
  video: null,

  // Step 4: Funding Info
  moneyToRaise: "",
  daysToRaise: "",
  fundingType: "", // "Profit Return", "Non-Profit Return"
  profitPercentage: "",

  // Step 5: Legal
  introduction: "",
  license: null,
  kyc: null,

  // Step 6: Bank Details
  bankName: "",
  bankBranch: "",
  accountHolder: "",
  accountNumber: "",
  ifscCode: "",

  // Step 7: Promotion
  promoteCampaign: false,
  promotion: "", // "yes" or "no"
  promoVideo: null,
  promoPoster: null,
  });

  //   {
  //   "companyName": "",
  //   "overview": "",
  //   "purpose": "",   // Options: "Business", "Startup", "Growth"
  //   "state": "Maharashtra",
  //   "city": "Pune",
  //   "pincode": "411045",
  //   "photo": "<photo_file_data_or_url>",     // Usually sent as file, see note below
  //   "video": "<video_file_data_or_url>",     // Optional, usually sent as file

  //   "moneyToRaise": "500000",
  //   "daysToRaise": "30",
  //   "profitPercentage": "10",    // Only present if fundingType is "profit"

  //   "introduction": "I am an entrepreneur with 10 years experience.",
  //   "license": "<license_file_data_or_url>", // Usually sent as file
  //   "kyc": "<kyc_file_data_or_url>",         // Usually sent as file

  //   "bankName": "State Bank of India",
  //   "bankBranch": "MG Road",
  //   "accountHolder": "Rohit Sharma",
  //   "accountNumber": "1234567890",
  //   "ifscCode": "SBIN0000456",
  //   "promoteCampaign": true,
  // "projectCategory": "Business",
  // "projectTitle": "projectTitle",
  // "profit": "89",
  // "fundingType": "Profit Return",
  // "projectOverview": "None",
  //   "promotion": "yes",  // Options: "yes", "no"
  //   "promoVideo": "<promovideo_file_data_or_url>",   // Only if promotion is "yes"
  //   "promoPoster": "<promoposter_file_data_or_url>" // Only if promotion is "yes"

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
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value || "", // Ensure it's not undefined
      }));
    }
  };

  const handleSubmit = async () => {
    if (!LoggedInUser) {
      alert("You need to be logged in to submit a fundraiser.");
      navigate("/login");
      return;
    }

    
    // Create a FormData instance to send the data including files
    const form = new FormData();
    form.append("userId", LoggedInUser._id);

// Step 1: Company & Project Info
form.append("companyName", formData.companyName);
form.append("overview", formData.overview);
form.append("purpose", formData.purpose);
form.append("projectTitle", formData.projectTitle);
form.append("projectCategory", formData.projectCategory);
form.append("projectOverview", formData.projectOverview);

// Step 2: Location
form.append("state", formData.state);
form.append("city", formData.city);
form.append("pincode", formData.pincode);

// Step 3: Media Uploads (files)
if (formData.photo) form.append("photo", formData.photo);
if (formData.video) form.append("video", formData.video);
if (formData.promoVideo) form.append("promoVideo", formData.promoVideo);
if (formData.promoPoster) form.append("promoPoster", formData.promoPoster);

// Step 4: Funding Info
form.append("moneyToRaise", formData.moneyToRaise);
form.append("daysToRaise", formData.daysToRaise);
form.append("fundingType", formData.fundingType);
if (formData.fundingType === "Profit Return " && formData.profitPercentage)
  form.append("profitPercentage", formData.profitPercentage);

// Step 5: Legal
form.append("introduction", formData.introduction || "");
if (formData.license) form.append("license", formData.license);
if (formData.kyc) form.append("kyc", formData.kyc);

// Step 6: Bank Details
form.append("bankName", formData.bankName);
form.append("bankBranch", formData.bankBranch);
form.append("accountHolder", formData.accountHolder);
form.append("accountNumber", formData.accountNumber);
form.append("ifscCode", formData.ifscCode);

// Step 7: Promotion
form.append("promoteCampaign", formData.promoteCampaign);
form.append("promotion", formData.promotion); // Pass the logged-in user's ID


    const token = localStorage.getItem("token");

    try {
      // Make the API call to submit the fundraiser
      const response = await axios.post(
        "http://localhost:5000/api/fundraiser/submit",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Fundraiser submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting fundraiser:", error);
      alert("Error submitting fundraiser.");
    }
  };

  const handleCreateFundraiser = async () => {
    const demoData = {
      companyName: formData.companyName || "",
  overview: formData.overview || "",
  purpose: formData.purpose || "",
  projectTitle: formData.projectTitle || "", // REQUIRED
  projectCategory: formData.projectCategory || "",
  projectOverview: formData.projectOverview || "",

  // Step 2: Location
  state: formData.state || "",
  city: formData.city || "",
  pincode: formData.pincode || "",

  // Step 3: Media Uploads
  photo: formData.photo || null,         // File (optional, but must be File if sent)
  video: formData.video || null,         // File (optional)

  // Step 4: Funding Info
  moneyToRaise: formData.moneyToRaise || "",
  daysToRaise: formData.daysToRaise || "",

  // Fix enum casing: convert "profit" to "Profit Return" (for backend schema match)
  fundingType:
    formData.fundingType === "Profit Return"
      ? "Profit Return"
      : formData.fundingType === "Non-Profit Return"
      ? "Non-Profit Return"
      : "",

  profitPercentage:
    formData.fundingType === "profit" ? formData.profitPercentage || "" : "",

  // Step 5: Legal
  introduction: formData.introduction || "", // REQUIRED
  license: formData.license || null,
  kyc: formData.kyc || null,

  // Step 6: Bank Details
  bankName: formData.bankName || "",
  bankBranch: formData.bankBranch || "",
  accountHolder: formData.accountHolder || "",
  accountNumber: formData.accountNumber || "",
  ifscCode: formData.ifscCode || "",

  // Step 7: Promotion
  promoteCampaign: !!formData.promoteCampaign,
  promotion: formData.promotion || "no",
  promoVideo: formData.promotion === "yes" ? formData.promoVideo || null : null,
  promoPoster: formData.promotion === "yes" ? formData.promoPoster || null : null,
      // For the review step, simply resubmit all fields
    };

    try {
      const response = await createFundraiser(demoData);
      alert("Fundraiser created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating fundraiser:", error);
      alert("Error creating fundraiser.");
    }
  };

  return (
    <main className="flex min-h-screen bg-white">
      {/* Sidebar with Clickable Steps */}
      <div className="w-1/4 bg-gray-50 p-8 space-y-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800">Steps</h2>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <div
            key={n}
            className={`p-4 cursor-pointer rounded-lg text-center transition-all duration-300 
            ${
              n === step
                ? "bg-yellow-200 text-gray-800"
                : "bg-gray-200 text-gray-500"
            }`}
            onClick={() => setStep(n)}
          >
            {n === 1 && "Project Details"}
            {n === 2 && "Funding"}
            {n === 3 && "Legal Documents"}
            {n === 4 && "Bank Details"}
            {n === 5 && "Promotion/Ad"}
            {n === 6 && "Review & Submit"}
          </div>
        ))}
      </div>

      {/* Main Content for Each Step */}
      <div className="w-3/4 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Start Your Fundraiser
        </h1>

        {/* Step Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Step 1: Project Details */}
          {step === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Project Details
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                In this step, you'll provide essential details about your
                project like title, overview, category, and location.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Project Title
                  </h3>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Enter your project title"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Enter the name of your project or campaign.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Project Overview
                  </h3>
                  <textarea
                    name="projectOverview"
                    rows={5}
                    value={formData.projectOverview || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Describe your project..."
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Provide a brief overview of what your project is about and
                    its goals.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Project Category
                  </h3>
                  <select
                    name="projectCategory"
                    value={formData.projectCategory }
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                  >
                    <option value="">Select Category</option>
                    <option value="Business">Business</option>
                    <option value="Startup">Startup</option>
                    <option value="Company Growth">Company Growth</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-2">
                    Choose the most suitable category for your project.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Project Location
                  </h3>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out mt-4"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out mt-4"
                    placeholder="Pincode"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Enter the location where your project is based.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Project Image
                  </h3>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    
                    onChange={handleChange}
                    className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg file:bg-blue-600 file:text-white file:hover:bg-blue-700 file:cursor-pointer"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Upload an image to represent your project.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Project Overview Video
                  </h3>
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                  
                    onChange={handleChange}
                    className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg file:bg-green-600 file:text-white file:hover:bg-green-700 file:cursor-pointer"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Upload a video overview of your project (optional).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Funding */}
          {step === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Funding</h3>
              <p className="text-sm text-gray-600 mb-4">
                Set the goal for the funds to raise, select the funding type,
                and determine how much profit (if any) will be returned.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Money to Raise
                  </h3>
                  <input
                    type="text"
                    name="moneyToRaise"
                    value={formData.moneyToRaise}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Enter the amount to raise"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Specify the target amount you wish to raise for your
                    project.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Days to Raise Funds
                  </h3>
                  <input
                    type="text"
                    name="daysToRaise"
                    value={formData.daysToRaise}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Enter the days to raise funds"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Enter the number of days you plan to raise funds.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Funding Type
                  </h3>
                  <select
                    name="fundingType"
                    value={formData.fundingType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                  >
                    <option value="">Select Type</option>
                    <option value="Profit Return">Profit Return</option>
                    <option value="Non-Profit Return">Non-Profit Return</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-2">
                    Select the type of funding for your project.
                  </p>
                </div>
                {formData.fundingType === "Profit Return" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Profit Percentage
                    </h3>
                    <input
                      type="text"
                      name="profitPercentage"
                      value={formData.profitPercentage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                      placeholder="Enter profit percentage"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      Enter the percentage of profit that backers will receive.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Legal Documents */}
          {step === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Legal Documents
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload your documents and verify your identity to make sure
                everything is legal and verified.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Introduce Yourself
                  </h3>
                  <textarea
                    name="introduction"
                    rows={4}
                    value={formData.introduction || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Introduce yourself"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Provide a brief introduction of yourself to build trust with
                    your backers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    License Picture
                  </h3>
                  <input
                    type="file"
                    name="license"
                    accept="image/*"
                    onChange={handleChange}
                   
                    className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg file:bg-blue-600 file:text-white file:hover:bg-blue-700 file:cursor-pointer"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Upload a copy of your business license for verification.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    KYC Verification
                  </h3>
                  <input
                    type="file"
                    name="kyc"
                    accept="image/*"
                    
                    
                    onChange={handleChange}
                    className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg file:bg-green-600 file:text-white file:hover:bg-green-700 file:cursor-pointer"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Upload your KYC document for verification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Bank Details */}
          {step === 4 && (
            <div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Bank Details
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter your bank details for transferring funds if your project
                is successful.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Bank Name
                  </h3>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Enter bank name"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Enter the name of your bank.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Bank Branch
                  </h3>
                  <input
                    type="text"
                    name="bankBranch"
                    value={formData.bankBranch}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Enter bank branch"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Enter the branch of your bank.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Account Holder Name
                  </h3>
                  <input
                    type="text"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Enter account holder name"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Enter the name of the account holder.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Account Number
                  </h3>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Enter account number"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Provide your bank account number.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    IFSC Code
                  </h3>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 ease-in-out"
                    placeholder="Enter IFSC code"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Enter your bank IFSC code.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Promotion/Ad */}
          {step === 5 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Promotion/Ad
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you want to promote your campaign for more visibility, you
                can upload promotional content.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Do you want to promote your campaign?
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Choose if you'd like to promote your campaign for extra
                    visibility.
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="promotion"
                        value="yes"
                        onChange={handleChange}
                        checked={formData.promotion === "yes"}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="promotion"
                        value="no"
                        onChange={handleChange}
                        checked={formData.promotion === "no"}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>

                {formData.promotion === "yes" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Upload Promotional Video
                    </h3>
                    <input
                      type="file"
                      name="promoVideo"
                      onChange={handleChange}
                      className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg file:bg-blue-600 file:text-white file:hover:bg-blue-700 file:cursor-pointer"
                    />
                    {formData.promoVideo && (
                      <span className="text-sm">
                        {formData.promoVideo.name}
                      </span>
                    )}

                    <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">
                      Upload Promotional Poster
                    </h3>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        name="promoPoster"
                        onChange={handleChange}
                        className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg file:bg-green-600 file:text-white file:hover:bg-green-700 file:cursor-pointer"
                      />
                      {formData.promoPoster && (
                        <span className="text-sm">
                          {formData.promoPoster.name}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Review & Submit */}
          {step === 6 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Review & Submit
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Please review your information before submitting your
                fundraiser.
              </p>
              <ul className="space-y-4">
                <li>
                  <strong>Project Title:</strong> {formData.companyName}
                </li>
                <li>
                  <strong>Project Overview:</strong> {formData.overview}
                </li>
                <li>
                  <strong>Project Location:</strong> {formData.state},{" "}
                  {formData.city}, {formData.pincode}
                </li>
                <li>
                  <strong>Project Category:</strong> {formData.purpose}
                </li>
                <li>
                  <strong>Funding Amount:</strong> ₹{formData.moneyToRaise}
                </li>
                <li>
                  <strong>Funding Type:</strong> {formData.fundingType}
                </li>
                {formData.fundingType === "profit" && (
                  <li>
                    <strong>Profit Percentage:</strong>{" "}
                    {formData.profitPercentage}%
                  </li>
                )}
                <li>
                  <strong>Promotion:</strong> {formData.promotion}
                </li>
              </ul>

              {formData.photo && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Project Image
                  </h3>
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Project Image"
                    className="w-48 rounded-lg shadow-lg"
                  />
                </div>
              )}
              {formData.video && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Project Overview Video
                  </h3>
                  <video
                    src={URL.createObjectURL(formData.video)}
                    controls
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}
              {formData.promoVideo && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Promotional Video
                  </h3>
                  <video
                    src={URL.createObjectURL(formData.promoVideo)}
                    controls
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}
              {formData.promoPoster && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Promotional Poster
                  </h3>
                  <img
                    src={URL.createObjectURL(formData.promoPoster)}
                    alt="Promo Poster"
                    className="w-48 rounded-lg shadow-lg"
                  />
                </div>
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

          {step < 6 ? (
            <button
              onClick={handleNext}
              className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 py-2 px-6 rounded-lg transition-all duration-300"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleCreateFundraiser} //handleSubmit
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
