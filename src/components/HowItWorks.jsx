import React from "react";
import demoVideo from "../assets/how_it_works.mp4"; // Your MP4 video

// Import your image icons
import profileIcon from "../assets/start.png";
import kycIcon from "../assets/form.png";
import rupeeIcon from "../assets/invest.png";
import lineImage from "../assets/line.png"; // the line image

export default function HowItWorks() {
  return (
    <section className="bg-white px-4 py-16">
      <h2 className="text-center text-3xl font-bold mb-10">
        Fundraising on here is easy, powerful, and trusted
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Steps */}
        <div className="relative space-y-20">
          {/* Step 1 */}
          <div className="flex items-start gap-4 relative">
            <div className="flex-shrink-0 relative flex flex-col items-center">
              {/* Number Circle */}
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold mb-2">
                1
              </div>
              
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-600">
                Use our tools to create your fundraiser
              </h3>
              <p className="text-lg text-gray-700">
                You'll be guided by prompts to add fundraiser details and set your goal.
                Make updates anytime.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4 relative">
            <div className="flex-shrink-0 relative flex flex-col items-center">
              {/* Number Circle */}
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold mb-2">
                2
              </div>
              
              {/* Line under icon */}
              
            </div>
            <div>
              <h3 className="font-bold text-blue-600">
                Reach donors by sharing
              </h3>
              <p className="text-sm text-gray-700">
                Share your fundraiser link and use the resources in your dashboard to gain momentum.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4 relative">
            <div className="flex-shrink-0 relative flex flex-col items-center">
              {/* Number Circle */}
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold mb-2">
                3
              </div>
              
              {/* No line under last icon */}
            </div>
            <div>
              <h3 className="font-bold text-blue-600">
                Securely receive funds
              </h3>
              <p className="text-sm text-gray-700">
                Add your bank information, or invite your fundraiser beneficiary to add theirs,
                and start receiving funds.
              </p>
            </div>
          </div>
        </div>

        {/* Video instead of Image */}
        <div className="text-center">
          <video
            src={demoVideo}
            controls
            autoPlay
            muted
            loop
            className="w-full max-w-md mx-auto rounded-lg shadow"
          />
        </div>
      </div>
    </section>
  );
}
