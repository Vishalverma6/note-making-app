import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">Welcome to NoteMaster</h1>
      <p className="text-lg text-gray-700 max-w-2xl">
        NoteMaster is a powerful and easy-to-use note-taking app designed to help you capture your ideas, thoughts, and tasks effortlessly.  
        Whether you're a student, professional, or creative thinker, our app provides the best way to organize and manage your notes.
      </p>

      <div className="mt-6 max-w-lg text-gray-600">
        <ul className="text-left space-y-2">
          <li>📌 Create and save notes securely</li>
          <li>🔍 Quickly search and filter your notes</li>
          <li>📝 Edit and update your notes anytime</li>
          <li>📂 Categorize your notes for better organization</li>
          <li>☁️ Cloud sync to access notes from anywhere</li>
        </ul>
      </div>

      <div className="mt-8">

        <Link to={"/signup"}
         className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
        
          Get Started
        </Link>
      </div>

      <footer className="mt-12 text-gray-500 text-sm">
        Built with ❤️
      </footer>
    
    </div>
  );
};

export default Home;
