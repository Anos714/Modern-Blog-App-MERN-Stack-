import { useState, useEffect, createContext, useContext } from "react";
import { api } from "../axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleSignup = async (formData) => {
    try {
      const response = await api.post("/user/signup", formData);
      setUser(response?.data?.user);
      toast.success(response?.data?.msg);
      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.msg;
      toast.error(errorMsg);
    }
  };

  const handleSignin = async (formData) => {
    try {
      const response = await api.post("/user/signin", formData);
      setUser(response?.data?.user);
      toast.success(response?.data?.msg);
      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.msg;
      toast.error(errorMsg);
    }
  };

  const checkUserStatus = async () => {
    try {
      const response = await api.get("/user/status");
      setUser(response?.data?.user);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.msg;
      toast.error(errorMsg);
    }
  };

  console.log(user);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const value = { handleSignup, handleSignin };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
