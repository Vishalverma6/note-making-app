import React from 'react';
import SignupForm from '../components/core/SignupForm';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Create Your Account</h1>
      <p className="text-lg text-center text-gray-700 mb-8">
        Sign up to start taking notes, organizing tasks, and staying productive!
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
