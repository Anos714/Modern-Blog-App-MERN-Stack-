import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { signupSuccess, signinSuccess } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await api.post("/user/google", user);

      if (mode === "signup") {
        dispatch(signupSuccess(response?.data?.user));
        toast.success(response?.data?.msg || "Signup successful!");
      } else {
        dispatch(signinSuccess(response?.data?.user));
        toast.success(response?.data?.msg || "Login successful!");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.msg || "Something went wrong";
      toast.error(errorMsg);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center px-4 py-2 border cursor-pointer border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Google
      </button>
    </div>
  );
};

export default GoogleAuth;
