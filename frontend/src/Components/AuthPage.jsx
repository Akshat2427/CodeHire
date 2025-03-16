import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch } from "react-redux";
import { login } from "../store/user";
import Google from "../features/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleAuth = async (e) => {
    e.preventDefault();
   

    try {
      const response = await fetch(`http://localhost:8080/user/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isLogin ? { email, password } : { name, email, password }
        ),
      });

      const data = await response.json();
      // console.log("data : error" , data)
      if (data.error ) {
        toast.error(`Error: ${data.error}`);
        return;
      }
      if(data.errors){
        toast.error(`Error: ${data.errors[0]}`);
        return;
      }

      toast.success(isLogin ? "Login Successful!" : "Account Created Successfully!");
      localStorage.setItem("token_codehire" , data.token);
      dispatch(login(data));
    } catch (error) {
      toast.error("Authentication Failed. Try again!");
      console.error("Error during authentication:", error);
    }
  };

  useEffect(() => {
    gsap.to(".bg-animation", {
      backgroundPosition: "200% center",
      duration: 10,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <motion.div 
      className="flex justify-center items-center h-screen bg-animation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center border-2 border-green-500"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
      >
        <motion.h2 
          className="text-3xl font-bold text-green-700 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </motion.h2>

        {!isLogin && (
          <motion.input 
            type="text" 
            placeholder="Username"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-4 py-2 border border-green-400 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-400"
          />
        )}

        <form className="mt-4 space-y-4">
          <motion.input 
            type="email" 
            placeholder="Email address"

            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-2 border border-green-400 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-400"
          />
          <motion.input 
            type="password" 
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-2 border border-green-400 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-400"
          />

          <motion.button 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition shadow-md"
            onClick={handleAuth}
          >
            {isLogin ? "Log in" : "Sign up"}
          </motion.button>
        </form>

        <motion.div className="my-4 text-gray-500 text-sm">
          or log in with
        </motion.div>

        <motion.div className="flex justify-center gap-4">
          <Google />
        </motion.div>

        <motion.div className="mt-6">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="text-green-600 font-semibold hover:underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
