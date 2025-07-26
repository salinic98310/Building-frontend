import React from "react";
import heroBg from "../assets/hero-bg.jpg"; // Background image
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";

// Circular image with gradient grey progress border and label
function CircularProgressImage({
  src,
  label,
  size = 180,
  percentage = 80,
  strokeWidth = 6,
  bgColor = "#e5e7eb"
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * percentage) / 100;
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* SVG progress ring */}
      <svg
        width={size}
        height={size}
        className="absolute top-0 left-0 transform -rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ccc" />
            <stop offset="100%" stopColor="#666" />
          </linearGradient>
        </defs>
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={`url(#${gradientId})`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {/* Circular image */}
      <div
        className="rounded-full overflow-hidden"
        style={{
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          margin: strokeWidth
        }}
      >
        <img
          src={src}
          alt="Investment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Label badge over image */}
      {label && (
        <div
          className="absolute bottom-2 left-2 bg-white text-black text-xs md:text-sm font-medium px-3 py-1 rounded-full shadow border border-gray-300"
          style={{ pointerEvents: "none" }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <>
      {/* Top Blue Banner */}
      <div className="w-full bg-blue-600 text-white text-center py-3 px-4 font-medium text-sm md:text-base">
        🎉 Special Offer: Launch your startup fundraiser and get 20% bonus visibility + discounted platform fees!
      </div>

      <section className="relative px-6 py-32 min-h-screen overflow-hidden flex items-start justify-center">
        {/* Blurred Background */}
        <div
          className="absolute inset-0 bg-center bg-cover scale-105 opacity-60"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        />
        {/* Whitish-Blue Overlay */}
        <div className="absolute inset-0 bg-[#eaf3fb] opacity-75"></div>

        {/* Large concentric dotted circles */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {/* Outer Large Circle */}
          <div
            style={{
              position: "absolute",
              width: "1200px",
              height: "1000px",
              border: "3px dotted #e0e0e0",
              borderRadius: "50%",
            }}
          />
          {/* Inner Smaller Circle */}
          <div
            style={{
              position: "absolute",
              width: "750px",
              height: "700px",
              border: "3px dotted #e0e0e0",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Images */}
          <div className="flex-1 hidden md:flex flex-col items-start gap-0.5 -mt-10">
            <div style={{ transform: "translateY(-30px) translateX(10.35rem)" }}>
              <CircularProgressImage src={img4} label="Option 4" size={180} percentage={85} />
            </div>
            <div style={{ transform: "translateY(-25px) translateX(-1.80rem)" }}>
              <CircularProgressImage src={img1} label="Option 1" size={180} percentage={70} />
            </div>
            <div style={{ transform: "translateY(-40px) translateX(10.85rem)" }}>
              <CircularProgressImage src={img3} label="Option 3" size={180} percentage={90} />
            </div>
          </div>

          {/* Center Text */}
          <div className="flex-5 w-full max-w-xl text-center text-black space-y-5 px-20 mt-[-130px]">
            <p className="text-lg md:text-2xl font-medium">
              #1 Crowdfunding Platform
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Successful fundraisers start here
            </h1>
            <button className="bg-black text-white px-8 py-4 rounded text-xl">
              Start A Fundraiser
            </button>
          </div>

          {/* Right Images */}
          <div className="flex-1 hidden md:flex flex-col items-end gap-0.5 -mt-10">
            <div style={{ transform: "translateY(-30px) translateX(-10.25rem)" }}>
              <CircularProgressImage src={img5} label="Option 5" size={180} percentage={80} />
            </div>
            <div style={{ transform: "translateY(-30px) translateX(1.75rem)" }}>
              <CircularProgressImage src={img2} label="Option 2" size={180} percentage={75} />
            </div>
            <div style={{ transform: "translateY(-40px) translateX(-10.5rem)" }}>
              <CircularProgressImage src={img6} label="Option 6" size={180} percentage={95} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
