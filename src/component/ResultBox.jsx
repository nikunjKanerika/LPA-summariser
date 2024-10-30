import React from 'react';
import { FaEnvelope, FaFilePdf, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Confirmation = ({ email, pdf, rules }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-4">Confirmation</h1>
        <p className="text-center text-gray-600 mb-6">
          We are currently processing your request, and you can expect the result to be sent to the email you provided shortly.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium mb-4">Your Details:</h2>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-500 mr-2" size={20} />
            <span className="font-medium">Email: </span>
            <span className="ml-2">{email}</span>
          </div>
          <div className="flex items-center mb-4">
            <FaFilePdf className="text-red-500 mr-2" size={20} />
            <span className="font-medium">Uploaded PDF: </span>
            <span className="ml-2">{pdf}</span>
          </div>
          <div className="flex items-center">
            <FaClipboardList className="text-blue-500 mr-2" size={20} />
            <span className="font-medium">Rules: </span>
          </div>
          <textarea
            className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mt-2 text-sm"
            rows="6"
            readOnly
            value={rules}
          ></textarea>
        </div>
        <button
          onClick={handleGoHome}
          className="w-full p-3 text-lg font-semibold text-white bg-custom-gradient rounded-lg hover:bg-hover-gradient transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
