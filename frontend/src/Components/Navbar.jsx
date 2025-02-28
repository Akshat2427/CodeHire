import React from "react";

const Navbar = ({title}) => {
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

        {/* Profile Picture */}
        <img
          src="https://randomuser.me/api/portraits/men/50.jpg"
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
