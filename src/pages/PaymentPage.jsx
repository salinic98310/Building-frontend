// PaymentPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Local assets (keep your paths as-is)
import qrImage from "../assets/qr_screenshot.jpg";
import paytm from "../assets/paytm.png";
import bhim from "../assets/bhim.png";
import gpay from "../assets/g-pay.png";
import phonepay from "../assets/phonepe.png";

const TABS = ["UPI", "Debit/Credit", "Net Banking"];

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const campaign = state?.campaign;

  const [amount, setAmount] = useState(500);
  const [tipPercentage] = useState(18); // shown if you want; not used in total below
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // modal tab state
  const [activeTab, setActiveTab] = useState("UPI");

  // fields for different tabs
  const [vpa, setVpa] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountName, setAccountName] = useState("");

  const totalAmount = amount; // adjust if you want to include tip: amount + Math.round((amount * tipPercentage) / 100)

  const handlePayment = () => {
    // basic guard; add your own validations here
    if (!name || !email || !phone || !amount) return alert("Please fill all details.");
    setShowQR(true);
  };

  const contributeFromActiveTab = () => {
    if (activeTab === "UPI") {
      if (!vpa) return alert("Please enter a UPI ID.");
      console.log("UPI Pay:", { vpa, amount: totalAmount });
    } else if (activeTab === "Debit/Credit") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv)
        return alert("Please fill card details.");
      console.log("Card Pay:", { cardNumber, cardName, cardExpiry, cardCvv, amount: totalAmount });
    } else if (activeTab === "Net Banking") {
      if (!accountNumber || !ifsc || !accountName)
        return alert("Please fill bank details.");
      console.log("NetBanking:", { accountNumber, ifsc, accountName, amount: totalAmount });
    } else if (activeTab === "Paytm") {
      console.log("Paytm selected. Amount:", totalAmount);
    } else if (activeTab === "Wallets") {
      console.log("Wallet selected. Amount:", totalAmount);
    }
    alert(`(Demo) Proceeding with ${activeTab} for ₹${totalAmount}`);
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4 text-gray-800 relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-black-600">
        Choose a contribution amount
      </h2>

      <p className="text-center text-gray-500 mb-4">
        Most Contributors contribute approx{" "}
        <span className="text-blue-400 font-semibold">₹2500</span> to this Fundraiser
      </p>

      {/* Preset Buttons */}
      <div className="flex justify-between gap-2 mb-4">
        {[1000, 2500, 4000].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className={`px-4 py-2 rounded-full border transition ${
              amount === amt
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            ₹{amt}
          </button>
        ))}
      </div>

      {/* Custom Input */}
      <div className="flex mb-4 rounded overflow-hidden border border-gray-300">
        <span className="bg-gray-100 px-4 py-2 font-medium text-gray-700">₹</span>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-2 outline-none"
        />
      </div>

      {/* Contributor Info */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name *"
          className="w-full px-4 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <span>Make my contribution anonymous</span>
        </label>

        <input
          type="email"
          placeholder="Email ID *"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex items-center border rounded">
          <span className="px-4 py-2 border-r">🇮🇳</span>
          <input
            type="tel"
            placeholder="Your Mobile Number *"
            className="w-full px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <p className="text-sm text-gray-500">All Payment updates will be sent on this number.</p>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-black hover:bg-blue-800 text-white py-3 rounded-full text-lg font-bold transition"
      >
        Proceed To Contribute ₹{totalAmount}
      </button>

      {/* Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-[60px] z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative flex overflow-hidden">
            {/* Left: Tabs */}
            <div className="w-1/4 bg-gray-50 p-4 border-r">
              <ul className="space-y-2 text-sm font-medium text-gray-700">
                {TABS.map((tab) => {
                  const isActive = tab === activeTab;
                  return (
                    <li key={tab}>
                      <button
                        onClick={() => setActiveTab(tab)}
                        className={`w-full text-left px-3 py-2 rounded transition ${
                          isActive
                            ? "bg-teal-100 text-teal-700 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {tab}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: Content */}
            <div className="flex-1 p-6 relative">
              {/* Close */}
              <button
                className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
                onClick={() => setShowQR(false)}
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>

              {/* Header */}
              <h2 className="text-xl font-semibold text-center text-teal-700 mb-4">
                {activeTab === "UPI" && "Scan the QR code from the app and make payment"}
                {activeTab === "Debit/Credit" && "Pay via Debit / Credit Card"}
                {activeTab === "Net Banking" && "Pay via Net Banking"}
              </h2>

              {/* Tab Bodies */}
              {activeTab === "UPI" && (
                <>
                  <div className="flex justify-center mb-4">
                    <img src={qrImage} alt="QR Code" className="w-48 h-48 object-contain rounded" />
                  </div>

                  <div className="flex justify-center gap-5 mb-6">
                    <img src={paytm} className="w-8 h-8" alt="Paytm" />
                    <img src={bhim} className="w-8 h-8" alt="BHIM" />
                    <img src={gpay} className="w-8 h-8" alt="GPay" />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
                      className="w-8 h-8"
                      alt="WhatsApp Pay"
                    />
                    <img src={phonepay} className="w-8 h-8" alt="PhonePe" />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter UPI Address (VPA)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      value={vpa}
                      onChange={(e) => setVpa(e.target.value)}
                    />
                    <button
                      onClick={contributeFromActiveTab}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-semibold shadow"
                    >
                      Contribute ₹{totalAmount}
                    </button>
                  </div>
                </>
              )}

              {activeTab === "Debit/Credit" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    contributeFromActiveTab();
                  }}
                  className="space-y-4 max-w-md mx-auto"
                >
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Card Number"
                    className="w-full px-3 py-2 border rounded"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    className="w-full px-3 py-2 border rounded"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-1/2 px-3 py-2 border rounded"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                    <input
                      type="password"
                      inputMode="numeric"
                      placeholder="CVV"
                      className="w-1/2 px-3 py-2 border rounded"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-semibold shadow"
                  >
                    Pay ₹{totalAmount}
                  </button>
                </form>
              )}

              {activeTab === "Net Banking" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    contributeFromActiveTab();
                  }}
                  className="space-y-4 max-w-md mx-auto"
                >
                  <input
                    type="text"
                    placeholder="Account Holder Name"
                    className="w-full px-3 py-2 border rounded"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Account Number"
                    className="w-full px-3 py-2 border rounded"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    className="w-full px-3 py-2 border rounded uppercase"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  />
                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-semibold shadow"
                  >
                    Pay ₹{totalAmount}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
