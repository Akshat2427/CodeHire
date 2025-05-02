import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/user";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();




  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        // console.log(user,token);

        // console.log("User:", user?.displayName);
        // console.log("Profile Picture:", user?.photoURL);
        // console.log("User Email:", user?.email);
        // console.log("Token:", token);
        const userInStore = {
          id: 0,
          name: user?.displayName,
          email: user?.email,

          imgUrl: user?.photoURL, role: "student"
        }
        dispatch(login({ token: null, user: userInStore }));
        navigate("/");
      })
      .catch((error) => {
        console.log("Error Google : ", error.message);

      });
  };

  return (
    <div
      className="w-full mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition flex items-center justify-center cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <FaGoogle className="mr-2" /> Login via Google

    </div>
  );
};

export default GoogleLogin;
