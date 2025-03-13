// src/components/Result.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Result = () => {
  const [result, setResult] = useState(null);

  const fetchResult = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/result');
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Voting Result</h2>
      {result ? (
        <div>
          <p className="text-lg text-gray-700">Yes: {result.total_yes} ({result.percentage_yes.toFixed(2)}%)</p>
          <p className="text-lg text-gray-700">No: {result.total_no} ({result.percentage_no.toFixed(2)}%)</p>
        </div>
      ) : (
        <p className="text-lg text-gray-700">No votes submitted yet.</p>
      )}
    </div>
  );
};

export default Result;