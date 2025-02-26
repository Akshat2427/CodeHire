import { Link } from "react-router-dom";
const Sidebar = () => (
    <div className="w-64 h-screen bg-gray-800 text-white fixed p-6">
        <h1 className="text-2xl font-bold mb-6">LearningUI</h1>
        <ul>
            <li className="mb-4">
                <Link to="/" className="hover:text-blue-400">Dashboard</Link>
            </li>
            <li className="mb-4">
                <Link to="/courses" className="hover:text-blue-400">Courses</Link>
            </li>
            <li className="mb-4">
                <Link to="/saved" className="hover:text-blue-400">Saved Courses</Link>
            </li>
            <li className="mb-4">
                <Link to="/help" className="hover:text-blue-400">Help Center</Link>
            </li>
            <li className="mb-4">
                <Link to="/settings" className="hover:text-blue-400">Settings</Link>
            </li>
        </ul>
    </div>
);
export default Sidebar;