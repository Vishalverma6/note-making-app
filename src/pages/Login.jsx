import React from 'react';
import LoginForm from '../components/core/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Welcome to Your Note-Taking App</h1>
      <p className="text-lg text-center text-gray-700 mb-8">
        Please log in to access your notes and start managing your tasks efficiently.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
