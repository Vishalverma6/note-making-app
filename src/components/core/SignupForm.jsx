import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signUp } from '../../services/operations/authAPI';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { fullName, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Dispatch signup action
    dispatch(signUp(fullName, email, password,confirmPassword, navigate));
    
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      <form onSubmit={submitHandler} className="w-full max-w-md bg-white p-6 rounded-lg ">
        {/* Full Name */}
        <label className="block mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Full Name<sup className="text-red-500">*</sup></p>
          <input
            type="text"
            name="fullName"
            value={fullName}
            placeholder="Enter Your Full Name"
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Email */}
        <label className="block mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Email Address<sup className="text-red-500">*</sup></p>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email Address"
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Password */}
        <label className="block mb-4 relative">
          <p className="text-lg font-semibold text-gray-700 mb-2">Create Password<sup className="text-red-500">*</sup></p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11 cursor-pointer"
          >
            {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
          </span>
        </label>

        {/* Confirm Password */}
        <label className="block mb-6 relative">
          <p className="text-lg font-semibold text-gray-700 mb-2">Confirm Password<sup className="text-red-500">*</sup></p>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-11 cursor-pointer"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;