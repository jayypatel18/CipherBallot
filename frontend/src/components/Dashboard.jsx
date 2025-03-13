// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import VoteForm from './VoteForm';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [voteStats, setVoteStats] = useState([]);
  const [error, setError] = useState('');

  const fetchResult = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/result');
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  };

  const fetchVoteStats = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/vote-stats');
      setVoteStats(response.data);
    } catch (error) {
      console.error('Error fetching vote stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/logout');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData); // Set the user state after login
  };

  useEffect(() => {
    if (user) {
      fetchResult();
      fetchVoteStats();
      const interval = setInterval(() => {
        fetchResult();
        fetchVoteStats();
      }, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  const pieData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        data: [result?.total_yes || 0, result?.total_no || 0],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  const barData = {
    labels: voteStats.map(stat => stat.time),
    datasets: [
      {
        label: 'Votes Over Time',
        data: voteStats.map(stat => stat.count),
        backgroundColor: '#2196F3',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <div className="max-w-6xl mx-auto p-6">
        {!user ? (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Please login to vote</h2>
          </div>
        ) : (
          <>
            <VoteForm user={user} onVote={fetchResult} setError={setError} />
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Vote Distribution</h2>
                <Pie data={pieData} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Votes Over Time</h2>
                <Line data={barData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;