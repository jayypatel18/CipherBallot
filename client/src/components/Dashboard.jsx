// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import VoteForm from './VoteForm';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // For displaying labels on charts
const apiUrl = import.meta.env.VITE_URL;
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
      const response = await axios.get(`${apiUrl}/result`);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  };

  // Fetch vote statistics over time
  const fetchVoteStats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/vote-stats`);
      setVoteStats(response.data);
    } catch (error) {
      console.error('Error fetching vote stats:', error);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`);
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

// ...existing code...

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
    <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
    <div className="flex-1 w-full max-w-6xl mx-auto p-6">
      {!user ? (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Please login to vote</h2>
        </div>
      ) : (
        <>
          <VoteForm user={user} onVote={fetchResult} setError={setError} />
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          
          <div className="mt-8 flex flex-col gap-6">
            {/* Pie Chart - better responsice design */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Vote Distribution</h2>
              <div className="h-[300px] md:h-[350px] flex items-center justify-center">
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      datalabels: {
                        formatter: (value, context) => {
                          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                          const percentage = ((value / total) * 100).toFixed(0);
                          return percentage > 5 ? `${percentage}%` : ''; // Only show labels for segments > 5%
                        },
                        color: '#fff',
                        font: {
                          weight: 'bold',
                          size: function(context) {
                            // Smaller font on mobile
                            return window.innerWidth < 768 ? 10 : 12;
                          }
                        },
                      },
                      legend: {
                        position: window.innerWidth < 768 ? 'bottom' : 'right',
                        labels: {
                          boxWidth: window.innerWidth < 768 ? 10 : 20,
                          padding: window.innerWidth < 768 ? 10 : 20,
                        }
                      }
                    },
                  }}
                />
              </div>
            </div>

            {/* Bar Chart - better responsice design */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Percentage of Votes</h2>
              <div className="h-[300px] md:h-[350px] flex items-center justify-center">
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: (value) => `${value}%`,
                        },
                      },
                    },
                    plugins: {
                      datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => `${value.toFixed(0)}%`,
                        color: '#000',
                        font: {
                          weight: 'bold',
                          size: function(context) {
                            return window.innerWidth < 768 ? 10 : 12;
                          }
                        },
                        // Only show for larger values on mobile
                        display: function(context) {
                          return window.innerWidth < 768 ? context.dataset.data[context.dataIndex] > 10 : true;
                        }
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Line Chart - always full width */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Votes Over Time</h2>
              <div className="h-[300px] md:h-[350px] flex items-center justify-center">
                <Line 
                  data={lineData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        ticks: {
                          maxRotation: 45,
                          minRotation: 45,
                          font: {
                            size: window.innerWidth < 768 ? 8 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    <Footer />
  </div>
);

};

export default Dashboard;