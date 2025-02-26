import { useState } from "react";
import { useAuth } from "./AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ email }); //  Redirect handled in AuthContext
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">Signup</h2>
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-md">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 m-2 w-full" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 m-2 w-full" required />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
