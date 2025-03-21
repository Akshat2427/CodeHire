import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Bookmark,
  LineChart,
  Compass,
  HelpCircle,
  User,
  Notebook,
  ChevronLeft, 
  ChevronRight, 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { setSideBar } from "../store/ui_store";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, link: "/" },
  { name: "My Courses", icon: <Notebook size={20} />, link: "/my-courses" },
  { name: "Schedule", icon: <Calendar size={20} />, link: "/schedule" },
  { name: "Saved Courses", icon: <Bookmark size={20} />, link: "/saved-courses" },
  { name: "Report", icon: <LineChart size={20} />, link: "/report" },
  { name: "Explore Courses", icon: <Compass size={20} />, link: "/explore-courses" },
  { name: "Mentorship", icon: <User size={20} />, link: "/mentorship" },
];

const MIN_WIDTH = 64; // Sidebar width when collapsed
const EXPANDED_WIDTH = 240; // Sidebar width when expanded

const Sidebar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Toggle sidebar collapsed state
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    dispatch(setSideBar(isCollapsed));
  };

  return (
    <div
      className={`fixed bg-white text-gray-900 h-full flex flex-col border-r border-gray-300 shadow-lg z-20 transition-all duration-300`}
      style={{ width: isCollapsed ? MIN_WIDTH : EXPANDED_WIDTH }}
    >
      {/* Logo Section */}
      <div className="p-2 flex items-center space-x-3 relative">
        <img

          src="/images/CodeHireLogo.png"

          alt="Logo"
          className={`rounded-full transition-all duration-300 ${
            isCollapsed ? "h-10 w-10" : "h-12 w-12"
          }`}
        />
        {!isCollapsed && (
          <h1 className="text-2xl font-bold tracking-wide font-[Poppins]">
            CodeHire
          </h1>
        )}

        {/* Toggle Button - Improved Styling and Positioning */}
       
      </div>

      {/* Menu Items */}
      
      <div className="flex-1 mt-4">
      <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-4 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-1 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-gray-600" />
          ) : (
            <ChevronLeft size={20} className="text-gray-600" />
          )}
        </button>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-3 ${
              isCollapsed ? "px-3 justify-center" : "px-6"
            } cursor-pointer rounded-lg transition-all font-medium ${
              selected === item.name
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setSelected(item.name);
              navigate(item.link);
            }}
            title={isCollapsed ? item.name : ""} // Tooltip when collapsed
          >
            <div className={`${!isCollapsed && "mr-3"} text-gray-600`}>{item.icon}</div>
            {!isCollapsed && <span className="text-md">{item.name}</span>}
          </div>
        ))}
      </div>

      {/* Help Center */}
      <div className="mt-2">
        <div
          className={`flex items-center p-3 ${
            isCollapsed ? "px-3 justify-center" : "px-6"
          } cursor-pointer rounded-lg transition-all font-medium ${
            selected === "Help Center" ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
          }`}
          onClick={() => {
            setSelected("Help Center");
            navigate("/helpcenter");
          }}
          title={isCollapsed ? "Help Center" : ""}
        >
          <HelpCircle size={20} className={`${!isCollapsed && "mr-3"} text-gray-600`} />
          {!isCollapsed && <span className="text-md">Help Center</span>}
        </div>
      </div>

      {/* User Profile */}
      <div
        onClick={() => {
          setSelected("Profile");
          navigate("/profile");
        }}
        className={`flex items-center p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100 transition-all ${
          selected === "Profile" ? "bg-blue-100 text-blue-600 font-semibold" : ""
        }`}
      >
        <div className="flex items-center w-full">
          <img
            src={
              user.imgUrl === "./images/pfp.jpg"
                ? "./images/pfp.jpg"
                : `https://images.weserv.nl/?url=${encodeURIComponent(user.imgUrl)}`
            }
            alt="Profile"
            className={`rounded-full ${isCollapsed ? "h-8  w-12 " : "h-12 w-12"}`}
          />
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-md font-semibold">{user.username ?? "User"}</p>
              <p className="text-sm text-gray-500">{user.role ?? "User"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

//this is sidebar 
//ye h mera nya branch