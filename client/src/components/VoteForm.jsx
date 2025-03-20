// src/components/VoteForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const VoteForm = ({ user, onVote, setError }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(''); // Clear any previous error
    try {
      const response = await axios.post(`http://127.0.0.1:5001/vote`, {
        user_id: user.user_id,
        option: selectedOption,  // Send the selected option
      });
      onVote(); // Refresh results after voting
      setSelectedOption('');
    } catch (error) {
      setSubmissionError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cast Your Vote</h2>
      {submissionError && (
        <p className="text-red-500 mb-4 text-center">{submissionError}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          required
        >
          <option value="" disabled>Select an option</option>
          <option value="Narendra Modi">Narendra Modi</option>
          <option value="Rahul Gandhi">Rahul Gandhi</option>
          <option value="Mukesh Patel">Mukesh Patel</option>
        </select>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
        >
          Submit Vote
        </button>
      </form>
    </div>
  );
};

export default VoteForm;