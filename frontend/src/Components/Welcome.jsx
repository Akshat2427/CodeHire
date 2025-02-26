import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to JobPrep App</h1>
      <p className="mb-6">Start your learning journey by signing up or logging in.</p>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-md">Login</Link>
        <Link to="/signup" className="px-6 py-2 bg-green-500 text-white rounded-md">Signup</Link>
      </div>
    </div>
  );
};

export default Welcome;
