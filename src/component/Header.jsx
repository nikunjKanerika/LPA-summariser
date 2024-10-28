import React, { useState } from 'react';
import BigLogo from '../assets/logo.png';
import { FaInfoCircle } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white relative mb-2 h-16 z-10 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={BigLogo} className="h-10 md:h-full" alt="Logo" />
          </a>
          <div className="flex-grow flex items-center justify-center absolute inset-x-0 mx-auto h-full">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              Legal Document Summarizer <FaInfoCircle className="ml-2 text-blue-500" />
            </h1>
          </div>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? 'absolute top-14 left-0 w-full md:text-normal' : 'hidden'
            } md:relative md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* Add any additional menu items here if needed */}
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Header;
