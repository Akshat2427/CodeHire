import { Link } from "react-router-dom";
const Header = () => (
  <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
    <input type="text" placeholder="Search courses..." className="p-2 border rounded-lg w-1/3" />
    <div>
      <Link to="/login" className="mr-4 text-blue-500">Login</Link>
      <Link to="/signup" className="text-blue-500">Sign Up</Link>
    </div>
  </div>
);
export default Header;