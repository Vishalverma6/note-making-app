import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    console.log("token", token)


    // logout Handler
  const logoutHandler =() => {
    dispatch(logout(navigate));
  }
  return (
    <nav className="bg-blue-400 text-white py-3 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className='flex gap-x-4'>
            <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
            Home
            </Link>

            {/* user Dashboard */}
            {
            token &&
            (
                <Link to="/dashboard/home" className="text-2xl font-bold hover:text-gray-200 transition">
                    Dashboard
                </Link>
            )
            }
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {/* Show login/signup if no token */}
          {
            token === null &&
            (
              <Link to="/login" 
              className=" border border-blue-500 py-[2px] px-1 bg-blue-500 rounded-sm hover:text-gray-300 transition">
                Log In
              </Link>
            )
          }
          {
            token === null &&
            (
              <Link to="/signup" 
              className=" border border-blue-500 py-[2px] px-1 bg-blue-500 rounded-sm hover:text-gray-300 transition">
                Sign Up
              </Link>
            )
          }
          
          {/* Show Logout if token exists */}
          {
            token &&
            (
             
                <button 
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
                 onClick={logoutHandler}
                >
                    Logout
                </button>
             
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
