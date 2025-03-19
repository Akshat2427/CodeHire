import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Bookmark,
  LineChart,
  Compass,
  Wallet,
  HelpCircle,
  User,
  Notebook,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, link: "/" },
  { name: "My Courses", icon: <Notebook size={20} />, link: "/my-courses" },
  { name: "Schedule", icon: <Calendar size={20} />, link: "/schedule" },
  { name: "Saved Courses", icon: <Bookmark size={20} />, link: "/saved-courses" },
  { name: "Report", icon: <LineChart size={20} />, link: "/report" },
  { name: "Explore Courses", icon: <Compass size={20} />, link: "/explore-courses" },
 
  { name: "Mentorship", icon: <User size={20} />, link: "/mentorship" },
];

const Sidebar = () => {
  const [selected, setSelected] = useState("Dashboard"); 
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

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
            onClick={() => {
              setSelected(item.name);
              navigate(item.link);
            }}
          >
            <div className="mr-3 text-gray-600">{item.icon}</div>
            <span className="text-md">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Help Center */}
      <div className="mt-2">
        <div
          className={`flex items-center p-3 px-6 cursor-pointer hover:bg-gray-100 rounded-lg transition-all font-medium ${
            selected === "Help Center" ? "bg-blue-100 text-blue-600 font-semibold" : ""
          }`}
          onClick={() => {
            setSelected("Help Center");
            navigate("/helpcenter");
          }}
        >
          <HelpCircle size={20} className="mr-3 text-gray-600" />
          <span className="text-md">Help Center</span>
        </div>
      </div>

      {/* User Profile */}
      <div
        onClick={() => {
          setSelected("Profile");
          navigate("/profile");
        }}
        className={`flex items-center p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100 ${
          selected === "Profile" ? "bg-blue-100 text-blue-600 font-semibold" : ""
        }`}
      >
        <div className="flex justify-center items-center">
          <div className="flex justify-center space-x-5">
            <img
              src={
                user.imgUrl === "./images/pfp.jpg"
                  ? "./images/pfp.jpg"
                  : `https://images.weserv.nl/?url=${encodeURIComponent(user.imgUrl)}`
              }
              alt={user.imgUrl}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="text-md font-semibold">{user.username ?? "User"}</p>
              <p className="text-sm text-gray-500">{user.role ?? "User"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;