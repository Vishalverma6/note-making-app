import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/operations/authAPI';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(login(email,password, navigate))

    // reset form
    setFormData({
      email: "",
      password: "",
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
      <form onSubmit={submitHandler} className="w-full max-w-md bg-white p-6 rounded-lg">
        {/* Email */}
        <label className="block mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Email Address<sup className="text-red-500">*</sup>
          </p>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email address"
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Password */}
        <label className="block mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Password<sup className="text-red-500">*</sup>
          </p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
