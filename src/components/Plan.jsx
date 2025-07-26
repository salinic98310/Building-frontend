import React from "react";
import starterImg from "../assets/starter.jpg";  // replace with your images
import incomeImg from "../assets/income.jpg";
import balancedImg from "../assets/income.jpg";
import growthImg from "../assets/starter.jpg";
import planIcon from "../assets/plan.png"; // icon next to the title

const plans = [
  {
    name: "Investment Without Return",
    desc: "The Starter Plan is designed for new or conservative investors. It allocates funds primarily to income-generating properties like residential buildings, warehouses.",
    min: "₹500",
    return: "~6–7%",
    fund: "100% eREITs (focus on rental income)",
    image: starterImg,
  },
  {
    name: "Investment With Return",
    desc: "The Starter Plan is designed for new or conservative investors. It allocates funds primarily to income-generating properties like residential buildings, warehouses.",
    min: "₹500",
    return: "~6–7%",
    fund: "100% eREITs (focus on rental income)",
    image: incomeImg,
  },
  ,
];

export default function Plans() {
  return (
    <section className="bg-white px-6 py-16">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
        Plans We Offer — <span className="text-blue-600">Choose Your Plan</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-30 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <button
            key={plan.name}
            onClick={() => alert(`You selected ${plan.name}`)}
            className="text-left rounded-lg overflow-hidden shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* Top Image */}
            <div className="h-48 w-full">
              <img
                src={plan.image}
                alt={plan.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Box Overlapping */}
            <div className="-mt-8 relative z-10 mx-4 bg-white rounded-lg shadow p-6">
              {/* Title with Icon */}
              <div className="flex items-center gap-3 mb-4">
                <img src={planIcon} alt="" className="h-7 w-7" />
                <h3 className="font-semibold text-xl">{plan.name}</h3>
              </div>
              <p className="text-base mb-4">{plan.desc}</p>
              <p className="text-base mb-1">
                <strong>Minimum Investment :</strong> {plan.min}
              </p>
              <p className="text-base mb-1">
                <strong>Estimated Return :</strong> {plan.return} annually
              </p>
              <p className="text-base mb-4">
                <strong>Fund Mix :</strong> {plan.fund}
              </p>
              <span className="inline-block text-green-700 bg-green-100 text-sm px-2 py-1 rounded">
                10 days left
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
