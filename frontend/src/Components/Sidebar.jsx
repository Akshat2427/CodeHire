import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 p-5 shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Prep</h2>

      <div className="flex flex-col space-y-4">
        <div className="p-3 hover:bg-gray-700 transition duration-300 rounded">
          <Link to="/" className="block">Dashboard</Link>
        </div>
        <div className="p-3 hover:bg-gray-700 transition duration-300 rounded">
          <Link to="/courses" className="block">Courses</Link>
        </div>
        <div className="p-3 hover:bg-gray-700 transition duration-300 rounded">
          <Link to="/saved" className="block">Saved Courses</Link>
        </div>
        <div className="p-3 hover:bg-gray-700 transition duration-300 rounded">
          <Link to="/help" className="block">Help Center</Link>
        </div>
        <div className="p-3 hover:bg-gray-700 transition duration-300 rounded">
          <Link to="/settings" className="block">Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
