// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DataForm from './DataForm';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [dataPoints, setDataPoints] = useState([]);

  const handleDataSubmit = (value) => {
    setDataPoints([...dataPoints, Number(value)]);
  };

  const chartData = {
    labels: dataPoints.map((_, index) => `Data Point ${index + 1}`),
    datasets: [
      {
        label: 'Data Values',
        data: dataPoints,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Privacy-Preserving Data Aggregation',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <DataForm onSubmit={handleDataSubmit} />
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;