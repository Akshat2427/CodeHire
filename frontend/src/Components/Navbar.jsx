import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/user"; // Import your logout action

const Navbar = ({ title }) => {
  const dispatch = useDispatch();
  const imgUrl = useSelector((state) => state.user.user.imgUrl);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <div className="bg-white text-gray-800 h-16 flex items-center px-6 pl-72 fixed w-full top-0 z-10">
      {/* Left Side - Title */}
      <h1 className="text-2xl font-bold tracking-wide font-[Poppins]">{title}</h1>

      {/* Right Side - Search, Notification, Profile */}
      <div className="ml-auto flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <i className="fas fa-bell text-xl"></i>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div className="h-14 w-16 flex justify-center items-center cursor-pointer" onClick={toggleDropdown}>
            <img
              src={
                imgUrl === "./images/pfp.jpg"
                  ? "./images/pfp.jpg"
                  : `https://images.weserv.nl/?url=${encodeURIComponent(imgUrl)}`
              }
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md py-2">
              <Link to="/profile" onClick={toggleDropdown} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <button
                onClick={() => { logoutHandler(); toggleDropdown(); }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
