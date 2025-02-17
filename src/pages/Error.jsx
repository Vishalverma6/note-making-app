import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-700 mb-6">
        We couldn't find the page you're looking for. Please check the URL or try again later.
      </p>
      <button
        onClick={handleGoBack}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default Error;
