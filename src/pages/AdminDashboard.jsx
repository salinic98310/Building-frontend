import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('/api/admin/campaigns', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCampaigns(response.data);
      } catch (err) {
        setError("Failed to fetch campaigns");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };

    fetchCampaigns();
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p>{error}</p>}
      
      <section>
        <h2>Campaigns</h2>
        <ul>
          {campaigns.map(campaign => (
            <li key={campaign._id}>{campaign.title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.name} ({user.role})</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
