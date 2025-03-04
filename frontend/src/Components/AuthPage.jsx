import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const googleClientId = "42532591352-h3vujt2a25ksgqoo7uq9ke65efeq61mt.apps.googleusercontent.com";
const googleRedirectUri = "http://localhost:5173";

const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?
  client_id=${googleClientId}
  &redirect_uri=${googleRedirectUri}
  &response_type=code
  &scope=openid%20email%20profile
  &access_type=online
  &include_granted_scopes=true`.replace(/\s+/g, "");

const socialButtons = [
  { name: "Google", color: "text-red-600 border-red-600", icon: "G+", url: googleAuthUrl },
  { name: "Facebook", color: "text-blue-700 border-blue-700", icon: "f", url: "https://www.facebook.com/login" },
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    gsap.to(".bg-animation", {
      backgroundPosition: "200% center",
      duration: 10,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const handleSocialLogin = (url) => {
    window.location.href = url;
  };

  return (
    <motion.div 
      className="flex justify-center items-center h-screen bg-animation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center border-2 border-green-500"
      >
        <motion.h2 
          className="text-3xl font-bold text-green-700"
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
            className="w-full px-4 py-2 border border-green-400 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-400"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
        )}
        
        <form className="mt-6 space-y-4">
          <motion.input 
            type="email" 
            placeholder="Email address" 
            className="w-full px-4 py-2 border border-green-400 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-400"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.input 
            type="password" 
            placeholder="Password" 
            className="w-full px-4 py-2 border border-green-400 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-400"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          
          <motion.button 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition shadow-md"
          >
            {isLogin ? "Log in" : "Sign up"}
          </motion.button>
        </form>

        <motion.div className="my-4 text-gray-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }}>
          or log in with
        </motion.div>

        <motion.div className="flex justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
          {socialButtons.map((button, index) => (
            <motion.button
              key={index}
              onClick={() => handleSocialLogin(button.url)}
              className={`flex items-center gap-2 border px-4 py-2 rounded-lg ${button.color} transition-all duration-300 hover:scale-110 shadow-md`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl">{button.icon}</span> {button.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.4 }}>
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
