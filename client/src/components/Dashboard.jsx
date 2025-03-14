// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import VoteForm from './VoteForm';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // For displaying labels on charts

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  ChartDataLabels // Register the datalabels plugin
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [voteStats, setVoteStats] = useState([]);
  const [error, setError] = useState('');

  // Fetch aggregated results
  const fetchResult = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/result');
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  };

  // Fetch vote statistics over time
  const fetchVoteStats = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/vote-stats');
      setVoteStats(response.data);
    } catch (error) {
      console.error('Error fetching vote stats:', error);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/logout');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Handle user login
  const handleLogin = (userData) => {
    setUser(userData); // Set the user state after login
  };

  // Fetch data when the user logs in
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

  // Pie chart data
  const pieData = {
    labels: result ? Object.keys(result) : [], // Options (e.g., Option1, Option2)
    datasets: [
      {
        data: result ? Object.values(result).map(opt => opt.count) : [], // Vote counts for each option
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3', '#FFC107'], // Colors for each option
      },
    ],
  };

  // Bar chart data for percentage of votes
  const barData = {
    labels: result ? Object.keys(result) : [], // Options (e.g., Option1, Option2)
    datasets: [
      {
        label: 'Percentage of Votes',
        data: result ? Object.values(result).map(opt => opt.percentage) : [], // Percentages for each option
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3', '#FFC107'], // Colors for each option
      },
    ],
  };

  // Line chart data for votes over time
  const lineData = {
    labels: voteStats.map(stat => stat.time), // Timestamps
    datasets: [
      {
        label: 'Votes Over Time',
        data: voteStats.map(stat => stat.count), // Vote counts over time
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
              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Vote Distribution</h2>
                <Pie
                  data={pieData}
                  options={{
                    plugins: {
                      datalabels: {
                        formatter: (value, context) => {
                          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                          const percentage = ((value / total) * 100).toFixed(2);
                          return `${percentage}%`; // Display percentage on the pie chart
                        },
                        color: '#fff', // Label text color
                        font: {
                          weight: 'bold', // Make the label text bold
                        },
                      },
                    },
                  }}
                />
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Percentage of Votes</h2>
                <Bar
                  data={barData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100, // Set the y-axis max to 100 for percentages
                        ticks: {
                          callback: (value) => `${value}%`, // Add percentage sign to y-axis labels
                        },
                      },
                    },
                    plugins: {
                      datalabels: {
                        anchor: 'end', // Position the label at the end of the bar
                        align: 'top', // Align the label at the top of the bar
                        formatter: (value) => `${value.toFixed(2)}%`, // Format the label as a percentage
                        color: '#000', // Label text color
                        font: {
                          weight: 'bold', // Make the label text bold
                        },
                      },
                    },
                  }}
                />
              </div>

              {/* Line Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Votes Over Time</h2>
                <Line data={lineData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;