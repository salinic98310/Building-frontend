// src/components/SecurityCompliance.jsx
import React from "react";
import secureIcon from "../assets/secure.png";
import complianceIcon from "../assets/compliance.png";
import verifiedIcon from "../assets/verified.png";

export default function SecurityCompliance() {
  return (
    <section className="bg-white px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Security & Compliance</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        <div className="p-4">
          <img src={secureIcon} alt="" className="h-14 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Data Encryption</h3>
          <p className="text-sm text-gray-600">
            All transactions and personal data are encrypted with 256-bit SSL.
          </p>
        </div>
        <div className="p-4">
          <img src={complianceIcon} alt="" className="h-14 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Regulatory Compliance</h3>
          <p className="text-sm text-gray-600">
            Fully compliant with SEBI and government regulations.
          </p>
        </div>
        <div className="p-4">
          <img src={verifiedIcon} alt="" className="h-14 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Verified Properties</h3>
          <p className="text-sm text-gray-600">
            All listed investments are thoroughly vetted by our team.
          </p>
        </div>
      </div>
    </section>
  );
}
