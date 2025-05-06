import React from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

const MIN_WIDTH = 64;
const EXPANDED_WIDTH = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const toggleCollapse = () => {
    dispatch(setSideBar(!openSidebar));
  };

  // Mapping nested routes to their parent menu link
  const routeMap = {
    "/": ["/"],
    "/my-courses": ["/my-courses", "/course"],
    "/schedule": ["/schedule"],
    "/saved-courses": ["/saved-courses"],
    "/report": ["/report"],
    "/explore-courses": ["/explore-courses"],
    "/mentorship": ["/mentorship"],
    "/helpcenter": ["/helpcenter"],
    "/profile": ["/profile"],
  };

  const isActive = (route) => {
    const matchPaths = routeMap[route];
    return matchPaths?.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  };

  return (
    <div
      className={`lg:visible fixed bg-white text-gray-900 h-full transition-all duration-300 ${
        !fullscreenSidebar ? "hidden" : "flex flex-col border-r border-gray-300 shadow-lg z-20"
      }`}
      style={{
        width: window.innerWidth >= 768 ? (!openSidebar ? MIN_WIDTH : EXPANDED_WIDTH) : "100%",
      }}
    >
      <div className="p-2 flex items-center space-x-3 relative">
        <img
          src={import.meta.env.VITE_AWS_S3_URL+"/CodeHireLogo.png"}
          alt="Logo"
          className={`rounded-full transition-all duration-300 ${
            !openSidebar ? "h-10 w-10" : "h-12 w-12"
          }`}
        />
        {openSidebar && (
          <h1 className="text-2xl font-bold tracking-wide font-[Poppins]">CodeHire</h1>
        )}
      </div>

      <div className="flex-1 mt-4">
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-4 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-1 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {!openSidebar ? (
            <ChevronRight size={20} className="text-gray-600" />
          ) : (
            <ChevronLeft size={20} className="text-gray-600" />
          )}
        </button>

        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-3 ${
              !openSidebar ? "px-3 justify-center" : "px-6"
            } cursor-pointer rounded-lg transition-all font-medium ${
              isActive(item.link)
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => navigate(item.link)}
            title={!openSidebar ? item.name : ""}
          >
            <div className={`${!openSidebar && "mr-3"} text-gray-600 px-4`}>{item.icon}</div>
            {openSidebar && <span className="text-md">{item.name}</span>}
          </div>
        ))}
      </div>

      {/* Help Center */}
      <div className="mt-2">
        <div
          className={`flex items-center p-3 ${
            !openSidebar ? "px-3 justify-center" : "px-6"
          } cursor-pointer rounded-lg transition-all font-medium ${
            isActive("/helpcenter") ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
          }`}
          onClick={() => navigate("/helpcenter")}
          title={!openSidebar ? "Help Center" : ""}
        >
          <HelpCircle size={20} className={`${openSidebar && "mr-3"} text-gray-600`} />
          {openSidebar && <span className="text-md">Help Center</span>}
        </div>
      </div>

      {/* User Profile */}
      <div
        onClick={() => navigate("/profile")}
        className={`flex items-center p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100 transition-all ${
          isActive("/profile") ? "bg-blue-100 text-blue-600 font-semibold" : ""
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
            className={`rounded-full ${!openSidebar ? "h-8  w-12 " : "h-12 w-12"}`}
          />
          {openSidebar && (
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
