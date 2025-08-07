import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "../src/components/Header.jsx";
import Hero from "../src/components/Hero.jsx";
import HowItWorks from "../src/components/HowItWorks.jsx";
import Plan from "../src/components/Plan.jsx";
import Footer from "../src/components/Footer.jsx";
import FeaturedProperties from "./components/FeaturedProperties.jsx";
import SecurityCompliance from "./components/SecurityCompliance.jsx";
import MoneyGrowth from "./components/MoneyGrowth.jsx";
import Testimonials from "./components/Testimonials.jsx";
import ProtectedRoute from "./pages/ProtectedRoutes.jsx";
// Pages
import BrowseInvestors from "./pages/BrowseInvestors.jsx";
import InvestmentDetail from "./pages/InvestmentDetail.jsx";
import FundraisingPage from "./pages/FundraisingPage.jsx";
import StartFundraiser from "./pages/StartAFundraiser.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminDashboard from "../src/admin/adminDashboard.jsx"; // Admin Dashboard component
// Context
import { FundraiserProvider } from "./context/FundraiserContext.jsx";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user); // Set logged-in user from localStorage on app load
    }
  }, []);

  return (
    <FundraiserProvider>
      <Router>
        <div className="font-sans text-gray-900">
          {/* Header visible on all routes */}
          <Header
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />

          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <HowItWorks />
                  <Plan />
                  <Testimonials />
                  <SecurityCompliance />
                  <Footer />
                </>
              }
            />

            {/* Login and Register Pages */}
            <Route
              path="/login"
              element={<LoginPage setLoggedInUser={setLoggedInUser} />}
            />
            <Route path="/register" element={<RegisterPage />} />

            {/* Browse Investors */}
            <Route
              path="/browse-investors"
              element={
                <>
                  <BrowseInvestors />
                  <Footer />
                </>
              }
            />

            {/* Investment Detail */}
            <Route path="/investment-detail" element={<InvestmentDetail />} />

            {/* Fundraising Page */}
            <Route
              path="/fundraising"
              element={
                <>
                  <FundraisingPage />
                  <Footer />
                </>
              }
            />

            {/* Start Fundraiser */}
            <Route path="/start-fundraiser" element={<StartFundraiser />} />

            {/* Protected Routes for Regular Users */}
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </FundraiserProvider>
  );
}
