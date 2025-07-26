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

// Pages
import BrowseInvestors from "./pages/BrowseInvestors.jsx";
import InvestmentDetail from "./pages/InvestmentDetail.jsx";
import FundraisingPage from "./pages/FundraisingPage.jsx";
import StartFundraiser from "./pages/StartAFundraiser.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.jsx";

// Context
import { FundraiserProvider } from "./context/FundraiserContext.jsx";

// Protected Route Component to ensure only logged-in users can access certain pages
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token");

  // If user is not logged in, redirect to login
  if (!token) {
    return <LoginPage />;
  }

  return <Element {...rest} />;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in (via JWT in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <FundraiserProvider>
      <Router>
        <div className="font-sans text-gray-900">
          {/* Header visible on all routes */}
          <Header isLoggedIn={isLoggedIn} />

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
            <Route path="/login" element={<LoginPage />} />
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
            <Route path="/investment/:id" element={<InvestmentDetail />} />

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

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={Dashboard} />}
            />
          </Routes>
        </div>
      </Router>
    </FundraiserProvider>
  );
}
