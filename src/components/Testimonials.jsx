// src/components/Testimonials.jsx
import React from "react";
import investor1 from "../assets/investor3.jpg";
import investor2 from "../assets/investor2.jpg";
import investor3 from "../assets/investor1.jpg";

const testimonials = [
  {
    name: "Priya R.",
    comment:
      "Investing here has been seamless and profitable. The platform is easy to use, and my returns are consistent.",
    image: investor1,
  },
  {
    name: "Amit K.",
    comment:
      "I love how transparent everything is. I can track my investments in real-time.",
    image: investor2,
  },
  {
    name: "Sneha M.",
    comment:
      "The team is supportive, and the returns have exceeded my expectations.",
    image: investor3,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Investors Say</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-gray-50 border rounded-lg p-6 text-center shadow hover:shadow-md transition"
          >
            <img
              src={t.image}
              alt={t.name}
              className="h-16 w-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-sm text-gray-700 mb-3">"{t.comment}"</p>
            <h3 className="font-semibold">{t.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
