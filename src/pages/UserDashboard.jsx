import React from "react";
import { CiStar } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className=" bg-blue-600 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-6">All Notes</h2>
        <nav className="space-y-3">
          <a href="/dashboard/home" className="flex gap-1 items-center px-3 py-2 rounded-md hover:bg-blue-700">
          <FaHome /> Home
          </a>
          <a href="/profile" className=" flex items-center gap-1 px-3 py-2 rounded-md hover:bg-blue-700">
          <CiStar /> Favourites
          </a>
          
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
