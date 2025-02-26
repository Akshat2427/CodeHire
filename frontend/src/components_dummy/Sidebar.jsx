import React, { useState } from "react";

// Static data for menu items with Font Awesome icons
const menuItems = [
  { name: "Dashboard", icon: "fas fa-home" },
  { name: "Schedule", icon: "fas fa-calendar-alt" },
  { name: "Saved Courses", icon: "fas fa-bookmark" },
  { name: "Report", icon: "fas fa-chart-line" },
  { name: "Explore Courses", icon: "fas fa-compass" },
  { name: "Certificates", icon: "fas fa-certificate" },
  { name: "Transaction", icon: "fas fa-wallet" },
];

const Sidebar = () => {
  const [selected, setSelected] = useState("Dashboard"); // Default selection

  return (
    <div className="fixed bg-white text-gray-900 h-screen w-60 flex flex-col  border-r border-gray-300 shadow-lg z-20">
      {/* Logo */}
      <div className="p-4 flex items-center space-x-3">
        <img
          src="https://static.vecteezy.com/system/resources/previews/004/909/777/non_2x/coding-logo-design-template-vector.jpg"
          alt="Logo"
          className="h-12 w-12 rounded-full"
        />
        <h1 className="text-2xl font-bold tracking-wide font-[Poppins]">CodeHire</h1>
      </div>

      {/* Menu Items */}
      <div className="flex-1 mt-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-3 px-6 cursor-pointer rounded-lg transition-all font-medium ${
              selected === item.name
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelected(item.name)}
          >
            <i className={`${item.icon} text-lg mr-3`}></i>
            <span className="text-md">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Help Center and Settings */}
      <div className="mt-2">
        <div
          className="flex items-center p-3 px-6 cursor-pointer hover:bg-gray-100 rounded-lg transition-all font-medium"
          onClick={() => setSelected("Help Center")}
        >
          <i className="fas fa-question-circle text-lg mr-3"></i>
          <span className="text-md">Help Center</span>
        </div>
        <div
          className="flex items-center p-3 px-6 cursor-pointer hover:bg-gray-100 rounded-lg transition-all font-medium"
          onClick={() => setSelected("Settings")}
        >
          <i className="fas fa-cog text-lg mr-3"></i>
          <span className="text-md">Settings</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center p-4 border-t border-gray-200">
        <i className="fas fa-user-circle text-3xl text-gray-600 mr-3"></i>
        <div>
          <p className="text-md font-semibold">Akshat</p>
          <p className="text-sm text-gray-500">Developer</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
