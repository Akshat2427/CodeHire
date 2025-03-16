import React, { useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import AuthPage from './Components/AuthPage';
import AllRoutes from './AllRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { login } from './store/user';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token_codehire');
        // console.log("toekn : 1" , token)
        if (!token) return;
        // console.log("toekn : 2" , token)
        const decode = jwtDecode(token);
        // console.log('decode', decode);

        const currentTime = Date.now() / 1000;
        if (decode.exp < currentTime) {
          // console.log('Token has expired');
          localStorage.removeItem('token_codehire');
          toast.error('Session expired! Please login again.');
          return;
        }

        const res = await fetch('http://localhost:8080/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          console.error('Error fetching profile:', res.status);
          if (res.status === 401) {
            localStorage.removeItem('token_codehire');
            toast.error('Session expired! Please login again.');
          }
          return;
        }

        const data = await res.json();
        // console.log('Profile data:', data);

        const user = {
          id: data.id,
          name: data.name ,
          email: data.email,
          role: data.role,
        };

        dispatch(login({ token, user }));
        toast.success(`Hello ${data.name}`);
        // console.log("toast.success")
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to fetch user data. Please try again.');
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {user.isAuthenticated ? (
        <>
          <Sidebar />
          <Navbar title={`Hello 👋 , ${user.user.username ?? 'User'}`} />  
          <AllRoutes />
          {/* <footer className="bg-gray-800 text-white p-4 text-center ml-60">
                <p>&copy; 2025 xAI Learning Platform. All rights reserved.</p>
            </footer> */}
        </>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

export default App;
