import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/fundraising-hero.jpg"; // Replace with your hero image

export default function FundraisingPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Start a Business Fundraiser
          </h1>
          <p className="text-lg mb-6 text-gray-700">
            No fees to start or deadlines to meet. Raise funds to power your business dreams.
          </p>
          <Link
            to="/start-fundraiser"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
          >
            Start a Fundraiser
          </Link>
        </div>
        <div>
          <img
            src={heroImage}
            alt="Fundraising hero"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* How it Works */}
      <section className=" py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
            How to Start Fundraising
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#FFFAE1] p-6 rounded-lg shadow-xl text-center">
              <p className="text-blue-600 font-semibold mb-2">Step 1</p>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Create Your Fundraiser</h3>
              <p className="text-gray-700">
                Use our simple tools to set up your fundraiser and tell your business story.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-[#FFFAE1] p-6 rounded-lg shadow-xl text-center">
              <p className="text-blue-600 font-semibold mb-2">Step 2</p>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Share Your Fundraiser</h3>
              <p className="text-gray-700">
                Share your link with your network to reach donors quickly.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-[#FFFAE1] p-6 rounded-lg shadow-xl text-center">
              <p className="text-blue-600 font-semibold mb-2">Step 3</p>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Receive Funds Securely</h3>
              <p className="text-gray-700">
                Easily collect funds in your bank account. No minimum goals required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
