// src/components/Navbar.jsx
import React, { useState } from 'react';
import AuthForm from './AuthForm';

const Navbar = ({ user, onLogin, onLogout }) => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleLoginClick = () => {
    setShowAuthForm(true); // Show the AuthForm modal
  };

  const handleCloseAuthForm = () => {
    setShowAuthForm(false); // Hide the AuthForm modal
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Voting System</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white">Welcome, {user.username}</span>
                <button
                  onClick={onLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* AuthForm Modal */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <AuthForm onLogin={onLogin} onClose={handleCloseAuthForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;