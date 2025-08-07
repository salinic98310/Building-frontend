import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
          { withCredentials: true }
        );
        console.log("stats in frontend :", response.data);
        setStats(response.data.stats || {});
        console.log("✅ Total Users:", response.data.stats?.totalUsers);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;
  if (!stats) return <div className="text-center mt-20">No data found.</div>;

  const chartData = stats?.monthlyRaised?.map((item) => ({
    month: item.month,
    raised: item.raised,
  })) || [];

  return (
    <section className="flex min-h-screen bg-white relative">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-[#FFF9DB] text-gray-700 p-6 flex flex-col justify-between shadow-2xl z-40">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <FaTimes className="text-xl" />
              </button>
            </div>
            <ul className="space-y-4 text-md font-semibold">
              {["Manage Users", "Manage Campaigns", "Analytics"].map((label, index) => (
                <li key={label}>
                  <button className="w-full text-left py-2 px-4 rounded-md bg-[#FFF9DB] hover:bg-gradient-to-r from-yellow-400 to-yellow-600 hover:text-white transition-all duration-300">
                    {label}
                  </button>
                  {index < 2 && (
                    <div className="h-[2px] w-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 rounded-full mt-2" />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 p-6 ${sidebarOpen ? "md:ml-64" : ""}`}>
        {/* Sidebar toggle */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 p-2 bg-[#FFF9DB] text-[#5b1e1e] px-4 py-2 rounded-md border border-yellow-400 shadow hover:bg-yellow-200 transition-all"
          >
            <FaBars className="inline mr-2" />
            Open Menu
          </button>
        )}

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin!</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          <KpiCard title="Total Users" value={stats?.totalUsers} />
          <KpiCard title="Total Fundraisers" value={stats?.totalFundraisers} />
          <KpiCard title="Total Investment" value={`₹${stats?.totalInvestment || 0}`} />
          <KpiCard title="Money Raised" value={`₹${stats?.totalMoneyRaised || 0}`} />
        </div>

        {/* 📊 Chart + Tables Section */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 w-full lg:w-[27%]">
            <h4 className="text-md font-semibold text-gray-800 mb-4 text-center">📈 Monthly Raised</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="raised" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-white rounded-lg shadow-md p-4 w-full lg:w-[41%]">
            <h4 className="text-md font-semibold text-gray-800 mb-4">📌 Recent Campaigns</h4>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-yellow-200 text-[#5b1e1e]">
                    <th className="py-2 px-4 border">Campaign</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentFundraisers?.length > 0 ? (
                    stats.recentFundraisers.map((f, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border">{f.projectTitle || "Untitled"}</td>
                        <td className="py-2 px-4 border">{f.email || "Unknown"}</td>
                        <td className="py-2 px-4 border">{new Date(f.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-2 px-4 border text-center text-gray-500">
                        No recent campaigns.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Fundraisers */}
          <div className="bg-white rounded-lg shadow-md p-4 w-full lg:w-[30%]">
            <h4 className="text-md font-semibold text-gray-800 mb-4">🏆 Top Raised Campaigns</h4>
            <table className="w-full table-auto text-sm border border-gray-400">
              <thead>
                <tr className="bg-blue-100 text-gray-800">
                  <th className="py-2 px-3 border">Title</th>
                  <th className="py-2 px-3 border">Amount</th>
                </tr>
              </thead>
              <tbody>
                {stats?.topFundraisers?.length > 0 ? (
                  stats.topFundraisers.map((f, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-3 border">{f.projectTitle}</td>
                      <td className="py-2 px-3 border">₹{f.moneyRaised.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-2 px-3 text-center text-gray-500">
                      No top fundraisers.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable KPI Card
const KpiCard = ({ title, value }) => (
  <div className="p-6 bg-white border border-blue-500 text-gray-700 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl">{value || 0}</p>
  </div>
);
