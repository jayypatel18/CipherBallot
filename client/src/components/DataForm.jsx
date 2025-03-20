// src/components/DataForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const DataForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit data to the backend
      await axios.post('http://127.0.0.1:5000/submit', {
        value: Number(inputValue),
      });
      setInputValue('');
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your data"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataForm;