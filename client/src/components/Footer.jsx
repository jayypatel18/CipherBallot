import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Voting System</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400 transition duration-300">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="hover:text-gray-400 transition duration-300">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="hover:text-gray-400 transition duration-300">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 border-t border-gray-700 pt-6">
          <p>&copy; 2025 Voting System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;