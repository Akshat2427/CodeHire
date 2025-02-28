import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Bookmark,
  LineChart,
  Compass,
  IdCard,
  Wallet,
  HelpCircle,
  Settings,
  User,
} from "lucide-react";

// Static data for menu items with Lucide-react icons
const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Schedule", icon: <Calendar size={20} /> },
  { name: "Saved Courses", icon: <Bookmark size={20} /> },
  { name: "Report", icon: <LineChart size={20} /> },
  { name: "Explore Courses", icon: <Compass size={20} /> },
  { name: "Certificates", icon: <IdCard size={20} /> },
  { name: "Transaction", icon: <Wallet size={20} /> },
];

const Sidebar = () => {
  const [selected, setSelected] = useState("Dashboard"); // Default selection

  return (
    <div className="fixed bg-white text-gray-900 h-screen w-60 flex flex-col border-r border-gray-300 shadow-lg z-20">
      {/* Logo */}
      <div className="p-2 flex items-center space-x-3">
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
            <div className="mr-3 text-gray-600">{item.icon}</div>
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
          <HelpCircle size={20} className="mr-3 text-gray-600" />
          <span className="text-md">Help Center</span>
        </div>
        <div
          className="flex items-center p-3 px-6 cursor-pointer hover:bg-gray-100 rounded-lg transition-all font-medium"
          onClick={() => setSelected("Settings")}
        >
          <Settings size={20} className="mr-3 text-gray-600" />
          <span className="text-md">Settings</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center p-4 border-t border-gray-200">
        <User size={28} className="text-gray-600 mr-3" />
        <div>
          <p className="text-md font-semibold">Anshul Choudhary</p>
          <p className="text-sm text-gray-500">Developer</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
