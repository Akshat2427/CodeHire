import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/user";
import { setSideBar } from "../store/ui_store"; // Import the UI store action
import { 
  Bell, 
  Search, 
  CalendarDays, 
  LayoutDashboard, 
  Brush, 
  Code, 
  BookOpen, 
  Video, 
  Edit, 
  FileText, 
  Terminal, 
  Mic,
  Menu  // Import Menu icon for the hamburger
} from "lucide-react";


const ICON_MAP = {
  LayoutDashboard: <LayoutDashboard className="text-blue-500" />,
  Brush: <Brush className="text-purple-500" />,
  Code: <Code className="text-green-500" />,
  BookOpen: <BookOpen className="text-orange-500" />,
  Video: <Video className="text-red-500" />,
  Edit: <Edit className="text-yellow-500" />,
  FileText: <FileText className="text-indigo-500" />,
  Terminal: <Terminal className="text-gray-500" />,
  Mic: <Mic className="text-pink-500" />,
};

const Navbar = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgUrl = useSelector((state) => state.user.user.imgUrl);
  const schedule = useSelector((state) => state.schedule.schedule);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
    const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false);

  // Toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false); // Close notification dropdown if open
  };

  // Toggle the notification dropdown
  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false); // Close profile dropdown if open
  };

  // Logout handler
  const logoutHandler = () => {
    dispatch(logout());
    setIsProfileOpen(false);
  };

  // Navigate to schedule page and close notification dropdown
  const handleScheduleClick = () => {
    navigate("/schedule");
    setIsNotificationOpen(false);
  };

  // Toggle sidebar open (for mobile view)
  const toggleSidebar = () => {
    dispatch(setSideBar(true));
  };

  return (
    // Responsive container: on medium and above screens, add left padding to account for sidebar width; on mobile, full width is used
    <div className="bg-white text-gray-800 h-16 flex items-center px-4 md:px-6 fixed w-full top-0 z-10 shadow-md">
      <div className="flex items-center">
        {/* Hamburger Icon visible only on mobile */}
        <button className="mr-4 md:hidden" onClick={toggleSidebar}>
          <Menu size={24} className="text-gray-800" />
        </button>
        {/* Title */}
        <h1
  className={`text-2xl font-bold tracking-tight font-[Poppins] text-gray-900 transition-all duration-300 ${
    openSidebar && !isCollapsed
      ? "ml-60" // Expanded sidebar (240px)
      : openSidebar && isCollapsed
      ? "ml-16" // Collapsed sidebar (approx 60px)
      : "ml-16" // No sidebar offset
  }`}
>
  {title}
</h1>
      </div>
      
      {/* Right Side - Search, Notification, Profile */}
      <div className="ml-auto flex items-center space-x-8">
        {/* Search Bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Notification Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleNotificationDropdown}
            className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Bell size={24} />
            {schedule.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                {schedule.length > 9 ? "9+" : schedule.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg py-3 border border-gray-100 max-h-96 overflow-y-auto hover:cursor-pointer">
              {schedule.length === 0 ? (
                <p className="px-4 py-2 text-gray-500 text-sm">No upcoming events</p>
              ) : (
                schedule.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={handleScheduleClick}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {ICON_MAP[event.icon] || <CalendarDays className="text-gray-500" size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{event.task}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {schedule.length > 3 && (
                <Link
                  to="/schedule"
                  className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 text-center"
                  onClick={() => setIsNotificationOpen(false)}
                >
                  View All Schedules
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            onClick={toggleProfileDropdown}
            className="h-12 w-12 flex justify-center items-center cursor-pointer hover:ring-2 hover:ring-blue-300 rounded-full transition-all duration-200"
          >
            <img
              src={
                imgUrl === "./images/pfp.jpg"
                  ? "./images/pfp.jpg"
                  : `https://images.weserv.nl/?url=${encodeURIComponent(imgUrl)}`
              }
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-lg py-3 border border-gray-100">
              <Link
                to="/profile"
                onClick={toggleProfileDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150"
              >
                Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150"
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
