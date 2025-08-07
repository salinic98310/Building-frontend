import { useState, useEffect } from "react";
import heroImg from "../assets/investors-hero.jpg"; // Replace with your hero image
import sampleImg from "../assets/fundraising-example.jpg"; // Replace with your sample image
import { getAllCampaigns } from "../api/campaign";
import { useNavigate } from "react-router-dom";

export default function BrowseInvestors() {
  const [fundraisers, setFundraisers] = useState([]); // Initialize as an empty array
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const fetchAllCampaigns = async () => {
    try {
      const res = await getAllCampaigns();
      setFundraisers(res.data); // Set the fetched campaigns to state
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  // Fetch fundraisers (investors) from the backend
  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  const handleViewDetails = (campaign) => {
    navigate(`/investment-detail`, { state: { campaign } });
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="min-h-screen px-6 py-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            Discover Investors and Startups
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Many people are investing here to grow their wealth and empower
            innovative startups.
          </p>
          <button className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
            Start Investing Today
          </button>
        </div>
        <div className="text-center">
          <img
            src={heroImg}
            alt="Investors Hero"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Investor Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Array.isArray(fundraisers) &&
          fundraisers.slice(0, visibleCount).map((f) => (
            <div
              key={f._id} // Use _id or another unique identifier
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col"
            >
              <div className="relative">
                <img
                  src={f.companyId ? f.companyId.photo : f.photo || sampleImg} // Fallback to sample image if no photo is available
                  alt={f.companyId ? f.companyId.projectTitle : f.projectTitle}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {f.companyId
                    ? f.companyId.projectTitle.split(" ")[0]
                    : f.state}, {f.city}
                  , {f.country}
                </span>
              </div>
              <h3 className="font-semibold text-lg mt-4 text-gray-900">
                {f?.projectTitle || "Untitled Project"}
              </h3>
              <p className="text-gray-600 mb-2">by {f?.userId?.name}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min((f.raisedAmount / 60000) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-700 font-medium">
                Target Amount : ₹{f.moneyToRaise || 0} 
              </p>
              <p className="text-sm text-gray-700 font-medium">
                ₹{f.moneyRaised || 0} raised
              </p>

              <button
                onClick={() => handleViewDetails(f)}
                className="mt-4 bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                View Profile
              </button>
            </div>
          ))}
      </div>

      {/* Show More Button */}
      {visibleCount < fundraisers.length && (
        <div className="text-center mt-10">
          <button
            onClick={showMore}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}

//previous code
/*
import React, { useState } from "react";
import heroImg from "../assets/investors-hero.jpg"; // Replace with your hero image
import sampleImg from "../assets/startup-sample.jpg"; // Replace with your sample image
import { Link } from "react-router-dom";
import { useFundraisers } from "../context/FundraiserContext"; // Import your context hook

const seededInvestors = [
  { id: "urban-heights-ventures", name: "Ananya Sharma", company: "Urban Heights Ventures", raised: 59473 },
  { id: "green-leaf-tech", name: "Rahul Mehra", company: "Green Leaf Tech", raised: 10294 },
  { id: "wave-innovations", name: "Priya Kapoor", company: "Wave Innovations", raised: 4783 },
  { id: "bright-future-logistics", name: "Karan Verma", company: "Bright Future Logistics", raised: 25000 },
  { id: "solaredge-solutions", name: "Meera Desai", company: "SolarEdge Solutions", raised: 36500 },
];

export default function BrowseInvestors() {
  const { fundraisers } = useFundraisers(); // Get submitted fundraisers
  const [visibleCount, setVisibleCount] = useState(6);

  // Combine seeded and user-submitted fundraisers
  const combinedFundraisers = [
    ...fundraisers.map((f) => ({
      id: f.id,
      name: "You",
      company: f.companyName,
      raised: 0,
      image: f.photo ? URL.createObjectURL(f.photo) : sampleImg,
    })),
    ...seededInvestors.map((s) => ({
      ...s,
      image: sampleImg,
    })),
  ];

  const showMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className=" min-h-screen px-6 py-16">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            Discover Investors and Startups
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Many people are investing here to grow their wealth and empower innovative startups.
          </p>
          <button className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
            Start Investing Today
          </button>
        </div>
        <div className="text-center">
          <img
            src={heroImg}
            alt="Investors Hero"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Investor ard
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {combinedFundraisers.slice(0, visibleCount).map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col"
          >
            <div className="relative">
              <img
                src={f.image}
                alt={f.company}
                className="w-full h-40 object-cover rounded-lg"
              />
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                {f.company.split(" ")[0]}, India
              </span>
            </div>
            <h3 className="font-semibold text-lg mt-4 text-gray-900">{f.company}</h3>
            <p className="text-gray-600 mb-2">by {f.name}</p>

            {/* Progress Bar 
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: ${Math.min((f.raised / 60000) * 100, 100)}% }}
              />
            </div>
            <p className="text-sm text-gray-700 font-medium">
              ₹{f.raised.toLocaleString()} raised
            </p>

            <Link to={/investment/${f.id}}>
              <button className="mt-4 bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 py-2 px-4 rounded transition duration-300 ease-in-out">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Show More Button 
      {visibleCount < combinedFundraisers.length && (
        <div className="text-center mt-10">
          <button
            onClick={showMore}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
} 
 */
